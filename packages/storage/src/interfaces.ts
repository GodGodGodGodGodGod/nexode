import type {
  DownloadResult,
  StorageObject,
  UploadOptions,
} from './types.js';

export interface StorageProvider {
  upload(
    key: string,
    data: Uint8Array,
    options?: UploadOptions,
  ): Promise<void>;

  download(
    key: string,
  ): Promise<DownloadResult>;

  delete(
    key: string,
  ): Promise<void>;

  exists(
    key: string,
  ): Promise<boolean>;

  list(
    prefix?: string,
  ): Promise<StorageObject[]>;
}