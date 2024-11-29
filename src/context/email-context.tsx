'use client'

import React, { PropsWithChildren } from 'react'
import { TEmail } from '@/types'
import { useEmailList } from '@/context'
import { deleteEmail as apiDeleteEmail } from '@/server-actions'
import { useRouter } from 'next/navigation'

interface EmailContextProps {
  email: TEmail
}

interface EmailContext extends EmailContextProps {
  deleteEmail: (id: number) => void
  loading: boolean
}

const EmailContext = React.createContext<EmailContext>({} as EmailContext)

export const EmailProvider = (props: PropsWithChildren<EmailContextProps>) => {
  const { children, email } = props

  const [loading, setLoading] = React.useState(false)

  const { deleteEmail: deleteEmailFromList } = useEmailList()
  const router = useRouter()

  const deleteEmail = async () => {
    setLoading(true)

    await apiDeleteEmail(email.id)

    const nextId = deleteEmailFromList(email.id)


    if (nextId) return router.push(`/${nextId}`)

    router.push('/')
  }

  return (
    <EmailContext.Provider value={{email, deleteEmail, loading}}>{children}</EmailContext.Provider>
  )
}

export const useEmail = () => {
  return React.useContext(EmailContext)
}