import type {
  Device,
} from './device.js';

export interface DeviceStore {
  save(
    device: Device,
  ): Promise<void>;

  findById(
    id: string,
  ): Promise<Device | undefined>;

  findByUserId(
    userId: string,
  ): Promise<
    readonly Device[]
  >;

  delete(
    id: string,
  ): Promise<void>;
}