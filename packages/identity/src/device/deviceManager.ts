import type {
  Device,
} from './device.js';

import type {
  DeviceStore,
} from './deviceStore.js';

export class DeviceManager {
  constructor(
    private readonly store: DeviceStore,
  ) {}

  register(
    device: Device,
  ): Promise<void> {
    return this.store.save(
      device,
    );
  }

  getDevices(
    userId: string,
  ): Promise<
    readonly Device[]
  > {
    return this.store.findByUserId(
      userId,
    );
  }

  revoke(
    deviceId: string,
  ): Promise<void> {
    return this.store.delete(
      deviceId,
    );
  }
}