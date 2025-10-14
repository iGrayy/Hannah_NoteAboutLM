import { apiService } from './api';
import { storageService } from './storage';
import { getWebSocketService, WebSocketService } from './websocket';

// Export named exports for individual import
export {
  apiService,
  storageService,
  getWebSocketService,
  WebSocketService
};

// Export a default object for convenience
const services = {
  api: apiService,
  storage: storageService,
  websocket: getWebSocketService,
};

export default services;
