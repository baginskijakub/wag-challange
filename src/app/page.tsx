import { getEmails } from '@/server-actions'
import { EEmailStatus } from '@/types'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: Promise<{
    status?: EEmailStatus
  }>
}


export default async function Home(props: Props) {
  const { searchParams } = props

  const params = await searchParams
  const status = params?.status ?? null

  const emails = await getEmails(status)

  if(emails.length > 0) {
    const statusQuery = status ? `?status=${status}` : ''
    redirect(`/${emails[0].id}${statusQuery}`)
  }

  return <>
    No emails found
  </>
}
