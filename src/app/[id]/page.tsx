import React from 'react'
import { getEmail, getEmails } from '@/server-actions'
import { EmailListProvider, EmailProvider } from '@/context'
import { DeleteButton } from '@/app/[id]/_components'
import { EEmailStatus } from '@/types'
import { SideBar } from './_components'

interface Props {
  params: Promise<{
    id: number
  }>
  searchParams: Promise<{
    status?: EEmailStatus
  }>
}

export default async function Page(props: Props) {
  const { params, searchParams } = props

  const { id } = await params

  const searchParamsStore = await searchParams
  const status = searchParamsStore?.status ?? null

  const email = await getEmail(id)
  const emails = await getEmails(status)

  return (
    <EmailListProvider emails={emails}>
      <EmailProvider email={email}>
        <SideBar>
        <div className={'w-full flex flex-col gap-4 p-4 relative'}>
          <p>From: {email.from}</p>
          <h1 className={'font-semibold text-xl'}>{email.title}</h1>
          <p>{email.content}</p>

          <DeleteButton />
        </div>
        </SideBar>
      </EmailProvider>
    </EmailListProvider>
  )
}