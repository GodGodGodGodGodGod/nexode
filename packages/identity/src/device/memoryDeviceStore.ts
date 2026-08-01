import type {
  Device,
} from './device.js';

import type {
  DeviceStore,
} from './deviceStore.js';

export class MemoryDeviceStore
  implements DeviceStore {

  private readonly devices =
    new Map<string, Device>();

  async save(
    device: Device,
  ): Promise<void> {

    this.devices.set(
      device.id,
      device,
    );
  }

  async findById(
    id: string,
  ): Promise<Device | undefined> {

    return this.devices.get(id);
  }

  async findByUserId(
    userId: string,
  ): Promise<
    readonly Device[]
  > {

    return [
      ...this.devices.values(),
    ].filter(
      device =>
        device.userId === userId,
    );
  }

  async delete(
    id: string,
  ): Promise<void> {

    this.devices.delete(id);
  }
}