'use client'

import React from 'react'
import { useEmail } from '@/context'

export const DeleteButton = () => {
  const { email, deleteEmail, loading } = useEmail()

  return (
    <button
      className={'bg-red-700 text-white px-3 py-2 rounded absolute top-4 right-4 hover:bg-red-500'}
      onClick={() => deleteEmail(email.id)}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}