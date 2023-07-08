import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getAuditTrails = () => {
  const { data, error } = useSWR('/inventofree-admin/api/audit-trails', fetcher)
  return {
    auditTrails: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}