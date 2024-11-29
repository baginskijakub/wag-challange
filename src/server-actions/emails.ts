'use server'

import { EEmailStatus, TEmail } from '@/types'
import { notFound } from 'next/navigation'

const BASE_URL = process.env.API_URL

export const getEmails = async (status: EEmailStatus | null): Promise<TEmail[]> => {
  const query = status ? `?status=${status}` : ''

  const emails = await fetch(`${BASE_URL}/emails${query}`)

  if(!emails.ok) {
    notFound()
  }

  return await emails.json()
}

export const getEmail = async (id: number): Promise<TEmail> => {
  const email = await fetch(`${BASE_URL}/emails/${id}`)

  if(!email.ok) {
    notFound()
  }

  return await email.json()
}

export const deleteEmail = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/emails/${id}`, {
    method: 'DELETE'
  })

  if(!response.ok) {
    notFound()
  }
}