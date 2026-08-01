import type {
  ApiKey,
} from './apiKey.js';

export interface ApiKeyRepository {
  findByKey(
    key: string,
  ): Promise<ApiKey | undefined>;

  save(
    apiKey: ApiKey,
  ): Promise<void>;

  revoke(
    id: string,
  ): Promise<void>;
}