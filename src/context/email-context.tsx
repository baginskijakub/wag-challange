'use client'

import React, { PropsWithChildren } from 'react'
import { TEmail } from '@/types'

interface EmailContext {
  email: TEmail
}

const EmailContext = React.createContext<EmailContext>({} as EmailContext)

export const EmailProvider = (props: PropsWithChildren<EmailContext>) => {
  const { children, email } = props

  return (
    <EmailContext.Provider value={{email}}>{children}</EmailContext.Provider>
  )
}

export const useEmail = () => {
  const context = React.useContext(EmailContext)

  if (!context) {
    throw new Error('useEmail must be used within a EmailProvider')
  }

  return context
}