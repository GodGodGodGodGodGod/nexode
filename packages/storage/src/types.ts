export interface StorageObject {
  key: string;
  size: number;
  contentType: string;
  lastModified: Date;
}

export interface UploadOptions {
  contentType?: string;
}

export interface DownloadResult {
  data: Uint8Array;
  contentType: string;
}