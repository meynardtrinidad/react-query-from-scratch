type TState = "loading" | "idle" | "success" | "error"

type QueryState<TData = unknown, TError = Error> = {
  state: TState
  data?: TData
  error?: TError
  lastUpdated: number
}

type QueryOptions = {
  retry: number
}

type FetchOptionsQuery<TData = unknown> = {
  key: string,
  fetchFn: () => Promise<TData>,
  options?: QueryOptions
}

const DEFAULT_RETRY = 3

const queryClient = (config?: QueryOptions) => {
  const cache: Map<string, QueryState> = new Map()
  const defaultOptions: QueryOptions = {
    retry: DEFAULT_RETRY,
    ...config
  }

  const getQuery = (key: string) => {
    return cache.get(key)
  }

  const setQuery = (key: string, value: QueryState) => {
    cache.set(key, value)
  }

  const fetchQuery = async <TData = unknown>({
    key,
    fetchFn,
    options
  }: FetchOptionsQuery<TData>) => {
    const mergedOptions = { ...defaultOptions, ...options }
    let state = getQuery(key)

    let attempts = 0

    try {
      while (true) {
        try {
          const data = await fetchFn()
          setQuery(key, {
            ...state,
            state: "success",
            lastUpdated: Date.now(),
            data: data
          })
          return data
        } catch (error) {
          attempts += 1

          if (attempts > mergedOptions.retry) {
            throw error
          }
        }
      }
    } catch (error) {
      throw error
    }
  }

  return {
    getQuery,
    setQuery,
    fetchQuery
  }
}

export { queryClient }
