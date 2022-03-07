type Cookies = { [cookie: string] : string }

export const cookies = (source: string = document.cookie): Cookies => {
  const cookieString: string = source
  if (!cookieString) { return {} }

  return cookieString
    .split(/\s*;\s*/)
    .reduce((cookies, keyValue) => {
      const [key, value] = keyValue.split('=')
      return { ...cookies, [key]: (value ? decodeURIComponent(value) : null) }
    }, {})
}

export const getCookie = (name: string): string => cookies()[encodeURIComponent(name)]

type ExpirationOptions = {
  expiresIn?: number,
  expiresAt?: Date,
}

type PathAndDomainOptions = {
  path?: string
  domain?: string
  secure?: string
}

type Options = ExpirationOptions & PathAndDomainOptions

export const setCookie = (name: string, value: string, options: Options = {}) => {
  validateCookieName(name)
  const nameValue: string = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  const expires: string = parseExpiration(options)
  const path: string = options.path || '/'
  const domain: string = options.domain && `domain=${options.domain}`
  const secure: string = options.secure && 'secure'
  document.cookie = [nameValue, expires, path, domain, secure].filter((x) => x != null).join('; ')
}

export const deleteCookie = (name: string, options: PathAndDomainOptions = {}) => {
  const nameValue: string = `${encodeURIComponent(name)}=`
  const expires: string = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  const path: string = options.path || '/'
  const domain: string = options.domain && `domain=${options.domain}`
  document.cookie = [nameValue, expires, path, domain].filter((x) => x != null).join('; ')
}

const validateCookieName = (name: string) => {
  if (!name || /^(?:expires|max-age|path|domain|secure)$/i.test(name)) {
    throw new Error('invalid cookie name')
  }
}

const parseExpiration = ({ expiresIn, expiresAt }: ExpirationOptions) => {
  if (expiresIn == null && expiresAt == null) {
    return null
  }
  if (typeof expiresIn === 'number') {
    return `max-age=${expiresIn}`
  }
  if (Object.prototype.toString.call(expiresAt) === '[object Date]') {
    return `expires=${expiresAt.toUTCString()}`
  }
}
