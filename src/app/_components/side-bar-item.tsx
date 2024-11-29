import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps, PropsWithChildren {

}

export const SideBarItem = (props: Props) => {
  const { children, ...restProps } = props

  return (
    <Link className={'text-md p-2 hover:bg-slate-200 rounded'} {...restProps}>
      {children}
    </Link>
  )
}