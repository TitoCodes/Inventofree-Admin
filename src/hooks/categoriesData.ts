import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getCategories = () => {
  const { data, error } = useSWR('/inventofree-admin/api/categories', fetcher)
  return {
    categories: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}