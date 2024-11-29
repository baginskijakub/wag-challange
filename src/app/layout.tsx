import { PropsWithChildren } from 'react'
import "./globals.css";

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
