'use client'

import React from 'react'
import { deleteEmail } from '@/server-actions'
import { useEmail } from '@/context'

export const DeleteButton = () => {
  const { email } = useEmail()

  return (
    <button
      className={'bg-red-700 text-white px-3 py-2 rounded absolute top-4 right-4 hover:bg-red-500'}
      onClick={() => deleteEmail(email.id)}
    >
      Delete
    </button>
  )
}