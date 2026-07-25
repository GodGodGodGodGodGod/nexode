import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';

import {
  dirname,
  join,
} from 'node:path';

import type {
  StorageProvider,
} from '../../interfaces.js';

import type {
  DownloadResult,
  StorageObject,
  UploadOptions,
} from '../../types.js';

export class LocalStorage
  implements StorageProvider
{
  constructor(
    private readonly root: string,
  ) {}

  async upload(
    key: string,
    data: Uint8Array,
    options?: UploadOptions,
  ): Promise<void> {
    const path = join(
      this.root,
      key,
    );

    await mkdir(
      dirname(path),
      {
        recursive: true,
      },
    );

    await writeFile(path, data);

    void options;
  }

  async download(
    key: string,
  ): Promise<DownloadResult> {
    const path = join(
      this.root,
      key,
    );

    const data =
      await readFile(path);

    return {
      data,
      contentType:
        'application/octet-stream',
    };
  }

  async delete(
    key: string,
  ): Promise<void> {
    await rm(
      join(this.root, key),
      {
        force: true,
      },
    );
  }

  async exists(
    key: string,
  ): Promise<boolean> {
    try {
      await stat(
        join(this.root, key),
      );

      return true;
    } catch {
      return false;
    }
  }

  async list(
    prefix = '',
  ): Promise<StorageObject[]> {
    const directory = join(
      this.root,
      prefix,
    );

    try {
      const entries =
        await readdir(
          directory,
          {
            withFileTypes: true,
          },
        );

      const files =
        await Promise.all(
          entries
            .filter(
              (
                entry,
              ) =>
                entry.isFile(),
            )
            .map(
              async (
                entry,
              ) => {
                const fullPath =
                  join(
                    directory,
                    entry.name,
                  );

                const info =
                  await stat(
                    fullPath,
                  );

                return {
                  key: join(
                    prefix,
                    entry.name,
                  ),
                  size: info.size,
                  contentType:
                    'application/octet-stream',
                  lastModified:
                    info.mtime,
                };
              },
            ),
        );

      return files;
    } catch {
      return [];
    }
  }
}