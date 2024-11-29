'use client'

import React, { PropsWithChildren, useEffect } from 'react'
import { EEmailStatus, TEmail } from '@/types'
import { useSearchParams } from 'next/navigation'
import { getEmails } from '@/server-actions'

interface EmailListContext {
  emails: TEmail[]
}

const EmailListContext = React.createContext<EmailListContext>({} as EmailListContext)

export const EmailListProvider = (props: PropsWithChildren<EmailListContext>) => {
  const { children, emails } = props

  const [state, setState] = React.useState(emails)

  const search = useSearchParams()
  const status = search.get('status')

  useEffect(() => {
    const fetchEmails = async () => {
      const emails = await getEmails(status as EEmailStatus | null)
      setState(emails)
    }

    fetchEmails()

    console.log(status)
  }, [status])

  return (
    <EmailListContext.Provider value={{emails: state}}>{children}</EmailListContext.Provider>
  )
}

export const useEmailList = () => {
  const context = React.useContext(EmailListContext)

  if (!context) {
    throw new Error('useEmailList must be used within a EmailListProvider')
  }

  return context
}