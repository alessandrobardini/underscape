import { getCookie } from 'helpers/cookies'

const csrfToken = () => getCookie('CSRF-Token')

const setCsrfMeta = () => {
  const csrfTag: Element = document.querySelector('meta[name="csrf-token"]')
  csrfTag.setAttribute('content', csrfToken())
}

export default csrfToken
export { setCsrfMeta }
