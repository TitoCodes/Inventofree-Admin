import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getItems = () => {
  const { data, error } = useSWR('/inventofree-admin/api/items', fetcher)
  return {
    items: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}