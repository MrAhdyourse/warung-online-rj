import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
import { Product, PRODUCTS } from '../data/products';

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<Product> = {
  keys: [
    { name: 'name', weight: 0.4 },           // Nama produk paling penting
    { name: 'description', weight: 0.3 },    // Deskripsi kedua
    { name: 'category', weight: 0.2 },       // Kategori
    { name: 'unit', weight: 0.1 },           // Satuan
  ],
  threshold: 0.4,           // Semakin rendah = semakin ketat (0 = exact match, 1 = match semua)
  distance: 100,            // Maksimal jarak karakter untuk fuzzy match
  minMatchCharLength: 2,    // Minimal 2 karakter untuk mulai search
  includeScore: true,       // Include relevance score
  includeMatches: true,     // Include match info untuk highlighting
  ignoreLocation: true,     // Search di seluruh string, bukan hanya di awal
  findAllMatches: true,     // Cari semua match, bukan hanya yang pertama
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query (300ms)
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create Fuse instance once
  const fuse = useMemo(() => {
    return new Fuse(PRODUCTS, fuseOptions);
  }, []);

  // Search results with memoization
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const results = fuse.search(debouncedQuery.trim());
    // Return products sorted by relevance (lower score = more relevant)
    return results
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map(result => result.item);
  }, [fuse, debouncedQuery]);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setDebouncedQuery('');
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        setSearchQuery,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
