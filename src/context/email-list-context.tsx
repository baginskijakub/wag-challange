'use client'

import React, { PropsWithChildren, useEffect } from 'react'
import { EEmailStatus, TEmail } from '@/types'
import { useSearchParams } from 'next/navigation'
import { getEmails } from '@/server-actions'

interface EmailListContextProps {
  emails: TEmail[]
}

interface EmailListContext extends EmailListContextProps {
  deleteEmail: (id: number) => number | undefined
}

const EmailListContext = React.createContext<EmailListContext>({} as EmailListContext)

export const EmailListProvider = (props: PropsWithChildren<EmailListContextProps>) => {
  const { children, emails } = props

  const [state, setState] = React.useState(emails)

  const search = useSearchParams()
  const status = search.get('status')

  const deleteEmail = (id: number) => {
    setState((prevState) => {
      const index = prevState.findIndex((email) => email.id === id)

      if (index === -1) {
        return prevState
      }

      const updatedEmails = [...prevState]
      updatedEmails.splice(index, 1)

      setState(updatedEmails)
      return updatedEmails
    });

    const index = state.findIndex((email) => email.id === id)
    return state[index + 1]?.id || state[index - 1]?.id
  };

  useEffect(() => {
    const fetchEmails = async () => {
      const emails = await getEmails(status as EEmailStatus | null)
      setState(emails)
    }

    fetchEmails()
  }, [status])


  return (
    <EmailListContext.Provider value={{emails: state, deleteEmail}}>{children}</EmailListContext.Provider>
  )
}

export const useEmailList = () => {
  const context = React.useContext(EmailListContext)

  if (!context) {
    throw new Error('useEmailList must be used within a EmailListProvider')
  }

  return context
}