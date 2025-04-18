# React Query from Scratch

- This is a replication of `React Query` with minimal features.

## Minimum Requirements

- [ ] Components
    - [ ] **QueryClient**
        - Holds the central cache and configuration. Manages query states and interacts with query instances.
    - [ ] **QueryClientProvider**
        - Uses React Context to provide the `QueryClient` instance to all descendant components, enabling `useQuery` and other hooks to access the cache and configuration.
    - [ ] **useQuery**
        - The primary hook for fetching, caching, and subscribing to data. It takes a unique query key and a fetcher function, communicates with the `QueryClient`, and returns the query state (`data`, `isLoading`, `isError`, etc.).
- [ ] Functionalities
    - [ ] **Caching**
        - Store successfully fetched query data in an in-memory cache within the `QueryClient`, mapped by unique query keys. Return cached data immediately for subsequent requests with the same key if the data is considered fresh.
    - [ ] **Query Keys**
        - Use serializable keys (typically arrays or strings) provided to `useQuery` to uniquely identify cached data. Ensure identical keys always refer to the same cache entry.
    - [ ] **Query Status Reporting**
        - `useQuery` must return detailed status information about the request lifecycle, including:
            - `data`: The successfully resolved data.
            - `error`: The error object if the request failed.
            - `isLoading`: True only during the initial fetch for a given query key when no cached data exists.
            - `isFetching`: True whenever a fetch is in progress (initial load or background refetch).
            - `status`: A string indicating the primary state (`'loading'`, `'error'`, `'success'`, `'idle'`).
    - [ ] **Stale-While-Revalidate**
        - On component mount or query key change, if cached data exists but is considered "stale" (e.g., based on a default `staleTime`), return the stale data immediately for a fast UI update, while triggering a background fetch ("revalidate") to get fresh data. Update the UI again when the fetch completes.
    - [ ] **Background Refetching Triggers**
        - Implement automatic background data refetching for active queries based on common events to keep data fresh:
            - On Component Mount: Refetch if data is marked as stale.
            - On Window Focus: Refetch when the browser tab/window regains focus after being inactive.
            - *(Optional minimal: On Network Reconnect)*
    - [ ] **Retry Policy**
        - Implement an automatic retry mechanism for requests that fail with specific transient error codes. Retry up to `n` times if the response status code is `$408$ (Request Timeout)`, `$429$ (Too Many Requests)`, `$500$ (Internal Server Error)`, `$502$ (Bad Gateway)`, `$503$ (Service Unavailable)`, or `$504$ (Gateway Timeout)`. 
        - Use an exponential backoff strategy with jitter between retries. Ensure retries are safe for the HTTP method used (idempotent methods preferred).
    - [ ] **Mutations (`useMutation`)**
        - Provide a dedicated hook (`useMutation`) for handling data modification operations (e.g., POST, PUT, DELETE). It should not cache results like `useQuery` but should manage its own state (`isLoading`, `isError`, `isSuccess`, `error`, `data`) and provide a function to trigger the mutation manually.
    - [ ] **Query Invalidation**
        - Offer a method (e.g., `queryClient.invalidateQueries(['queryKey'])`) to manually mark specific cached data as stale. This is crucial for triggering refetches of related data after a successful mutation. Invalidated active queries will refetch based on the configured refetch triggers (e.g., immediately, on window focus).

## Future Functionalities

- [ ] **Configuration Options (`staleTime`, `cacheTime`)**
    - Allow users to configure key caching behaviors globally (via `QueryClient`) or per-query (via `useQuery` options), such as how long data is considered fresh (`staleTime`) and how long inactive data remains in the cache (`cacheTime`). Start with sensible defaults.
- [ ] **Basic DevTools**
    - Provide a developer tool (e.g., a separate component or basic browser console logging) to inspect the query cache, view query states, and potentially trigger actions like invalidation or refetching for easier debugging.

- [React Query From Scratch](https://github.com/philipfabianek/react-query-from-scratch/tree/main)
- [React Query From Scratch](https://github.com/tigerabrodi/react-query-from-scratch/tree/main)
