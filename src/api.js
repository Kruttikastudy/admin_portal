const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getApiUrl = (path) => {
    // If we have a base URL (production), we use it. 
    // If not (local with proxy), we use the relative path.
    if (API_BASE_URL && path.startsWith('/api')) {
        return `${API_BASE_URL}${path}`;
    }
    return path;
};
