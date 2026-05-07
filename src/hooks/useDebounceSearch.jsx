// hooks/useDebounceSearch.js

import { useState, useEffect } from "react";

const useDebounceSearch = (delay = 2000) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    resetSearch,
  };
};

export default useDebounceSearch;
