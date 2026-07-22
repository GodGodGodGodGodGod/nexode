import { logger } from '../src/index.js';

logger.info('Logger initialized');
logger.warn('This is a warning');
logger.error('Something went wrong', {
  service: 'logger',
});