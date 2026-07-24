export interface SessionMetadata {
  ipAddress?: string;
  userAgent?: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  metadata?: SessionMetadata;
}