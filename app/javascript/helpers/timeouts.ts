/**
* Basically like setTimeout, but it returns a promise, and takes the
* callback function as the last argument. The promise resolves with the return
* value of the callback function.
*
* @param {number} milliseconds - The timeout in milliseconds
* @param {function} fn - The function to execute when the timeout elapses
*
* @returns {Promise}
*/
export const timeout = <T>(milliseconds: number, fn: () => T): Promise<T> => (
  new Promise(resolve => {
    setTimeout(() => resolve(fn()), milliseconds)
  })
)

/**
* Returns a promise that resolves after the given `milliseconds`
* to the given `value` (or `null` if not given).
*
* @param {number} milliseconds - The timeout in milliseconds
* @param {any} [value=null] - The value that the returned promise resolves to
*
* @returns {Promise}
*/
export const resolveAfter = <T>(milliseconds: number, value: T = null): Promise<T> => (
  new Promise(resolve => {
    setTimeout(resolve, milliseconds, value)
  })
)

/**
* Returns a promise that rejects after the given `milliseconds`
* to the given error.
*
* @param {number} milliseconds - The timeout in milliseconds
* @param {Error} error - The error that the returned promise rejects with
*
* @returns {Promise}
*/
export const rejectAfter = (milliseconds: number, error?: Error): Promise<void> => (
  new Promise((resolve, reject) => {
    setTimeout(reject, milliseconds, error || new Error(`Timeout: ${milliseconds} milliseconds elapsed`))
  })
)

/**
* Schedules the given callback function in the event loop at the next
* available option. It is equivalent to scheduling a timeout with a delay of 0,
* so the effect is to execute the callback asynchronously but as soon as possible.
*
* @param {function} fn - The callback function to execute
*
* @returns {Promise}
*/
export const nextTick = <T>(fn: () => T): Promise<T> => timeout(0, fn)

/**
* Returns a promise that resolves (to undefined) when the given
* predicate function returns a truthy value. If the predicate does not return
* true within `timeoutMillis` milliseconds (3000 by default), the promise will
* reject with an error.
*
* The predicate function will be invoked many times in loop until either the
* condition is satisfied, or the timeout elapses. Therefore, it should be free
* of side effects (or at least it should be ok to perform the effect many times).
*
* @param {function} fn - A predicate function to test the condition for resolving the promise
* @param {number} timeoutMillis - The timeout in milliseconds after which, if the condition did not become true, the returned promise rejects
*
* @returns {Promise}
*/
export const resolveWhen = (fn: Function, timeoutMillis: number = 3000): Promise<void> => {
  const promise: Promise<void> = new Promise((resolve) => {
    const tryCondition = () => {
      if (fn()) {
        resolve()
      } else {
        nextTick(tryCondition)
      }
    }
    nextTick(tryCondition)
  })

  const timeout: Promise<void> = rejectAfter(timeoutMillis, new Error('waitUntil: timeout elapsed'))

  return Promise.race([promise, timeout])
}
