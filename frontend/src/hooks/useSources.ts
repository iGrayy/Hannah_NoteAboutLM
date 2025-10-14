import { useState, useEffect, useCallback } from 'react';
import { 
  Source, 
  CreateSourceRequest, 
  UpdateSourceRequest, 
  LoadingState 
} from '../types';
import { apiService, storageService } from '../services';

interface UseSourcesReturn {
  sources: Source[];
  activeSource: Source | null;
  activeSourceId: string | null;
  setActiveSourceId: (id: string | null) => void;
  loading: LoadingState;
  error: string | null;
  loadSources: () => Promise<void>;
  createSource: (request: CreateSourceRequest) => Promise<void>;
  updateSource: (id: string, request: UpdateSourceRequest) => Promise<void>;
  deleteSource: (id: string) => Promise<void>;
  searchSources: (query: string) => Source[];
}

export const useSources = (): UseSourcesReturn => {
  const [sources, setSources] = useState<Source[]>([]);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // Load sources from storage on initial mount
  useEffect(() => {
    const savedSources = storageService.getSources();
    if (savedSources && savedSources.length > 0) {
      setSources(savedSources);
      if (!activeSourceId) {
        setActiveSourceId(savedSources[0].id);
      }
    }
    // loadSources(); // Fetch latest from API - Temporarily disabled
  }, []);

  // Persist sources to storage
  useEffect(() => {
    storageService.setSources(sources);
  }, [sources]);

  const handleApiCall = async <T>(
    apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>
  ) => {
    setLoading('loading');
    setError(null);
    try {
      const response = await apiCall();
      if (response.success) {
        setLoading('success');
        return response.data;
      } else {
        setError(response.error || 'An unknown error occurred');
        setLoading('error');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setLoading('error');
    }
    return undefined;
  };

  const loadSources = useCallback(async () => {
    const data = await handleApiCall(apiService.getSources);
    if (data) {
      setSources(data);
    }
  }, []);

  const createSource = useCallback(async (request: CreateSourceRequest) => {
    // Optimistic update
    const optimisticSource: Source = {
      id: `temp-${Date.now()}`,
      ...request,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSources(prev => [optimisticSource, ...prev]);
    setActiveSourceId(optimisticSource.id);

    const data = await handleApiCall(() => apiService.createSource(request));
    if (data) {
      // Replace optimistic source with actual source from server
      setSources(prev => prev.map(source => 
        source.id === optimisticSource.id ? data : source
      ));
      setActiveSourceId(data.id);
    } else {
      // Remove optimistic source on failure
      setSources(prev => prev.filter(source => source.id !== optimisticSource.id));
      setActiveSourceId(null);
    }
  }, []);

  const updateSource = useCallback(async (id: string, request: UpdateSourceRequest) => {
    // Optimistic update
    setSources(prev => prev.map(source => 
      source.id === id 
        ? { ...source, ...request, updatedAt: new Date().toISOString() }
        : source
    ));

    const data = await handleApiCall(() => apiService.updateSource(id, request));
    if (data) {
      setSources(prev => prev.map(source => source.id === id ? data : source));
    } else {
      // Revert optimistic update on failure
      loadSources();
    }
  }, [loadSources]);

  const deleteSource = useCallback(async (id: string) => {
    const data = await handleApiCall(() => apiService.deleteSource(id));
    if (data !== undefined) {
      setSources(prev => prev.filter(source => source.id !== id));
      if (activeSourceId === id) {
        const remainingSources = sources.filter(source => source.id !== id);
        setActiveSourceId(remainingSources.length > 0 ? remainingSources[0].id : null);
      }
    }
  }, [activeSourceId, sources]);

  const searchSources = useCallback((query: string): Source[] => {
    if (!query.trim()) return sources;
    
    const lowercaseQuery = query.toLowerCase();
    return sources.filter(source =>
      source.title.toLowerCase().includes(lowercaseQuery) ||
      source.content.toLowerCase().includes(lowercaseQuery) ||
      source.metadata?.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [sources]);

  const activeSource = sources.find(source => source.id === activeSourceId) || null;

  return {
    sources,
    activeSource,
    activeSourceId,
    setActiveSourceId,
    loading,
    error,
    loadSources,
    createSource,
    updateSource,
    deleteSource,
    searchSources,
  };
};
