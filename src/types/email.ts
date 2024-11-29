export enum EEmailStatus {
  Active = 'active',
  Sent = 'sent',
  Draft = 'draft',
}

export interface TEmail {
  id: number
  from: string
  title: string
  content: string
  status: EEmailStatus
}