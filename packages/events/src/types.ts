export interface EventMetadata {
  id: string;
  timestamp: string;
  source: string;
  version: string;
}

export interface BaseEvent<T = unknown> {
  name: string;
  metadata: EventMetadata;
  payload: T;
}

export type EventHandler<T = unknown> = (
  event: BaseEvent<T>
) => void | Promise<void>;