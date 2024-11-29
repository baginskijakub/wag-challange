import React from 'react'
import { getEmail } from '@/server-actions'
import { EmailProvider } from '@/context'
import { DeleteButton } from '@/app/[id]/_components'

interface Props {
  params: Promise<{
    id: number
  }>
}

export default async function Page(props: Props) {
  const { params } = props
  const { id } = await params

  const email = await getEmail(id)

  return (
    <EmailProvider email={email}>
      <div className={'w-full flex flex-col gap-4 p-4 relative'}>
        <p>From: {email.from}</p>
        <h1 className={'font-semibold text-xl'}>{email.title}</h1>
        <p>{email.content}</p>

        <DeleteButton />
      </div>
    </EmailProvider>
  )
}