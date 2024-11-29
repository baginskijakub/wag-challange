import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps, PropsWithChildren {
  selected?: boolean
}

export const SideBarItem = (props: Props) => {
  const { children, selected = false, ...restProps } = props

  return (
    <Link
      className={`text-md p-2 rounded ${
        selected ? 'bg-blue-200' : 'hover:bg-slate-200'
      }`}
      {...restProps}
    >
      {children}
    </Link>
  )
}