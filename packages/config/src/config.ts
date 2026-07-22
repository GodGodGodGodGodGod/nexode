import { loadConfig } from './loader.js';

export const config = loadConfig();

export function getConfig() {
  return config;
}