'use client'

import React, { PropsWithChildren } from 'react'
import { SideBarItem } from './side-bar-item'
import { useEmailList } from '@/context'
import { User2 } from 'lucide-react'
import { EEmailStatus } from '@/types'
import { useParams, useSearchParams } from 'next/navigation'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const SideBar = (props: PropsWithChildren) => {
  const { children } = props

  const searchParams = useSearchParams()
  const params = useParams<{ id?: string }>()

  const { emails } = useEmailList()

  const selectedEmailId = params.id ? parseInt(params.id) : undefined

  const buildHref = (id: number) => {
    const status = searchParams.get('status')

    return `/${id}${status ? `?status=${status}` : ''}`
  }

  return (
    <>
      <ProgressBar height="2px" color={'#000000'} options={{ showSpinner: false }} shallowRouting />

      <div className={'flex h-screen'}>
        <div className={'w-32 flex flex-col p-4 border-r'}>
          <SideBarItem href={`/?status=${EEmailStatus.Active}`} replace>Inbox</SideBarItem>
          <SideBarItem href={`/?status=${EEmailStatus.Sent}`}>Sent</SideBarItem>
          <SideBarItem href={`/?status=${EEmailStatus.Draft}`}>Drafts</SideBarItem>
        </div>

        <div className={'w-64 flex flex-col gap-2 p-4 border-r overflow-y-scroll'}>
          {emails.map((email) => (
            <SideBarItem key={email.id} href={buildHref(email.id)} selected={selectedEmailId === email.id}>
              <div className={'flex gap-2 items-center w-full '}>
                <User2 size={16} />

                <div className={'flex flex-col w-[calc(100%-32px)]'}>
                  <span className={'font-medium text-sm'}>{email.from}</span>
                  <span className={'text-sm opacity-70'}>{email.title}</span>
                  <span className={'text-sm opacity-70 truncate text-ellipsis'}>{email.content}</span>
                </div>
              </div>
            </SideBarItem>
          ))}
        </div>

        <div className={'flex flex-1'}>
          {children}
        </div>
      </div>
    </>

  )
}