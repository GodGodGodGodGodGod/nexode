export interface HashOptions {
  memoryCost?: number;
  timeCost?: number;
  parallelism?: number;
}

export interface EncryptionResult {
  iv: string;
  content: string;
  tag: string;
}

export interface RandomOptions {
  length?: number;
}