import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, RefObject } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import './Button.scss'

export type ButtonV2Props = {
  /** The React component rendered inside the button */
  children?: React.ReactNode
  /** The main purpose of the button, which mainly influences its color palette */
  type?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'none' | 'danger' | 'danger-outline'
  /** The shape of the button */
  variant?: 'rounded' | 'circle' | 'square'
  /** The dimension of the button */
  size?: 'xs' | 's' | 'l' | 'xl'
  /** An optional additional class name to be assigned to the button */
  className?: string
  /** The name of a fontawesome icon to be rendered inside the button, at the left of the content */
  iconLeft?: string
  /** The name of a fontawesome icon to be rendered inside the button, at the right of the content */
  iconRight?: string
  /** The function triggered when clicking on the button  */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  /** The URL of the page the link goes to (only when the button acts as a link).
    * The action does not trigger a reload of the page and it's intended to be used when dealing with internal routes handled by React Router */
  to?: LinkProps['to']
  /** The URL of the page the link goes to (only when the button acts as a link) */
  href?: string
  /** A boolean flag which, if true, creates a submit button */
  submit?: boolean
  /** A boolean flag which, if true, creates an icon button */
  icon?: boolean
  /** A boolean flag which, if true, creates a block button */
  block?: boolean
} & {
  [extraPropName: string]: any
}

export const TYPES = {
  none: '',
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  'danger-outline': 'danger outline'
}

export const SIZES = {
  xs: 'btn-xs',
  s: 'btn-sm',
  l: 'btn-lg',
  xl: 'btn-xl'
}

const Button: ForwardRefExoticComponent<ButtonV2Props & RefAttributes<HTMLAnchorElement | HTMLButtonElement>> = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonV2Props>(({
  children,
  type = 'default',
  variant,
  size,
  className: additionalClass,
  onClick,
  to,
  href,
  iconLeft,
  iconRight,
  submit,
  icon,
  block,
  ...props
}, ref) => {
  const className = `ButtonV2 btn ${TYPES[type]} ${variant || ''} ${SIZES[size] || ''} ${additionalClass || ''} ${icon ? 'icon' : ''} ${block ? 'd-block' : ''}`.trim()
  const childrenComponent = <>
    {iconLeft && <><i className={iconLeft}></i>{(children || iconRight) && '\u00A0\u00A0'}</>}
    {children}
    {iconRight && <>{(children || iconLeft) && '\u00A0\u00A0'}<i className={iconRight}></i></>}
  </>
  const handleClick = onClick && { onClick }
  const anchorRef = ref as RefObject<HTMLAnchorElement>
  const buttonRef = ref as RefObject<HTMLButtonElement>

  return href
    ? <a className={className} href={href} ref={anchorRef} {...props} {...handleClick}>{childrenComponent}</a>
    : to
      ? <Link className={className} to={to} ref={anchorRef} {...props} {...handleClick}>{childrenComponent}</Link>
      : <button type={submit ? 'submit' : 'button'} ref={buttonRef} className={className} {...handleClick} {...props}>{childrenComponent}</button>
})

export default Button
