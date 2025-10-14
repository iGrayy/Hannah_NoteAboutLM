// Local storage service for persisting data
export class StorageService {
  private prefix: string;

  constructor(prefix: string = 'hannah-app') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}-${key}`;
  }

  // Generic methods
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error(`Failed to save to localStorage:`, error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to read from localStorage:`, error);
      return defaultValue || null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Specific methods for app data
  setSources(sources: any[]): void {
    this.set('sources', sources);
  }

  getSources(): any[] {
    return this.get('sources', []);
  }

  setConversations(conversations: any[]): void {
    this.set('conversations', conversations);
  }

  getConversations(): any[] {
    return this.get('conversations', []);
  }

  setConversationMessages(conversationId: string, messages: any[]): void {
    this.set(`conversation-${conversationId}`, messages);
  }

  getConversationMessages(conversationId: string): any[] {
    return this.get(`conversation-${conversationId}`, []);
  }

  setUserPreferences(preferences: any): void {
    this.set('user-preferences', preferences);
  }

  getUserPreferences(): any {
    return this.get('user-preferences', {
      theme: 'dark',
      language: 'vi',
      chatStyle: 'default',
      answerLength: 'default'
    });
  }

  setAppSettings(settings: any): void {
    this.set('app-settings', settings);
  }

  getAppSettings(): any {
    return this.get('app-settings', {
      autoSave: true,
      notifications: true,
      soundEnabled: false
    });
  }
}

// Singleton instance
export const storageService = new StorageService();
export default storageService;
