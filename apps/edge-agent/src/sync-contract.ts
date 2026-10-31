/** Typed sync envelope; transport and persistence are not implemented in v0.2. */
export interface EdgeEvent<T = unknown> {
  edgeId: string;
  sequence: number;
  idempotencyKey: string;
  recordedAt: string;
  kind: 'health' | 'accounting' | 'configuration_ack';
  payload: T;
}
export interface ConfigurationRevision<T = unknown> {
  revision: number;
  checksum: string;
  validUntil: string;
  payload: T;
}
export function acceptRevision(current: number, incoming: ConfigurationRevision): boolean {
  return Number.isSafeInteger(incoming.revision) && incoming.revision > current;
}
