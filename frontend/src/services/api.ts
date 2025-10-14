import { 
  ApiResponse, 
  Source, 
  CreateSourceRequest, 
  UpdateSourceRequest,
  Conversation,
  CreateConversationRequest,
  SendMessageRequest,
  Message
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Source API methods
  async getSources(): Promise<ApiResponse<Source[]>> {
    return this.request<Source[]>('/api/sources');
  }

  async getSource(id: string): Promise<ApiResponse<Source>> {
    return this.request<Source>(`/api/sources/${id}`);
  }

  async createSource(data: CreateSourceRequest): Promise<ApiResponse<Source>> {
    return this.request<Source>('/api/sources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSource(id: string, data: UpdateSourceRequest): Promise<ApiResponse<Source>> {
    return this.request<Source>(`/api/sources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSource(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/sources/${id}`, {
      method: 'DELETE',
    });
  }

  // Conversation API methods
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return this.request<Conversation[]>('/api/conversations');
  }

  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>(`/api/conversations/${id}`);
  }

  async createConversation(data: CreateConversationRequest): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteConversation(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/conversations/${id}`, {
      method: 'DELETE',
    });
  }

  // Message API methods
  async sendMessage(data: SendMessageRequest): Promise<ApiResponse<Message>> {
    const formData = new FormData();
    formData.append('conversationId', data.conversationId);
    formData.append('content', data.content);
    formData.append('type', data.type || 'text');
    
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata));
    }

    return this.request<Message>('/api/messages', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    return this.request<Message[]>(`/api/conversations/${conversationId}/messages`);
  }

  // File upload
  async uploadFile(file: File): Promise<ApiResponse<{ url: string; id: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<{ url: string; id: string }>('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/api/health');
  }
}

// Singleton instance
export const apiService = new ApiService();
export default apiService;
