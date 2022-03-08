import React from 'react'
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps, NavLink } from 'react-router-dom'
import './Link.scss'

type RouterLinkProps = {
  /** The URL of the page the link goes to.
    * The action does not trigger a reload of the page and it's intended to be used when dealing with internal routes handled by React Router */
  to?: ReactRouterLinkProps['to']
  href?: never
  /** The class to give the element when it is active. The default given class is active. This will be joined with the className prop. */
  activeClassName?: string
}

type AnchorProps = {
  to?: never
  /** The URL of the page the link goes to */
  href: string
  activeClassName?: never
}

type LinkCommonProps = {
  /** The size of the link */
  size?: 'xs' | 's' | 'm' | 'l'
  /** An optional additional class name to be assigned to the link */
  className?: string
  /** The React component rendered inside the link */
  children?: React.ReactNode
  /** removes styles from the link */
  unstyled?: boolean
} & {
  [extraPropName: string]: any
}

const SIZES = {
  xs: 'xsmall',
  s: 'small',
  m: 'medium',
  l: 'large'
}

export type LinkProps = LinkCommonProps & (AnchorProps | RouterLinkProps) & Omit<ReactRouterLinkProps, 'to'>

const Link: React.FC<LinkProps> = ({
  size = 'm',
  children,
  to,
  href,
  activeClassName,
  className: additionalClass,
  unstyled = false,
  ...props
}: LinkProps) => {
  const className = `Link ${SIZES[size]} ${additionalClass || ''} ${unstyled ? 'unstyled' : ''}`.trim()
  const childrenComponent = <>{children}</>

  return href
    ? <a href={href} {...props} className={className}>{childrenComponent}</a>
    : activeClassName
      ? <NavLink to={to} activeClassName={activeClassName} {...props} className={className}>{childrenComponent}</NavLink>
      : <ReactRouterLink to={to} {...props} className={className}>{childrenComponent}</ReactRouterLink>
}

export default Link
