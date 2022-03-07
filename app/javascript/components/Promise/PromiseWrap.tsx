import React from 'react'
import { resolveAfter } from 'helpers/timeouts'

/**
 * PromiseWrap is a component that helps rendering a UI based on the state of a
 * Promise (e.g. an HTTP request). It makes it easier to render a pure UI
 * component, by injecting props indicating the state of the promise: loading,
 * error, and resolved with success.
 *
 * The child component(s) will be rendered with the following props:
 *
 *   - promise: the promise being monitored
 *   - loading: a boolean indicating whether the promise is still pending
 *   - error: the rejection error if the promise is rejected, otherwise null
 *   - data: the resolved value if the promise resolves, otherwise null
 *   - any other prop passed to PromiseWrap
 *
 * The child component(s) to be rendered can be specified in two ways:
 *
 *   - Passing a child component prop
 *   - Passing a function as children
 *
 * @example
 * // With a component prop:
 * <ProimiseWrap
 *   promise={myPromise} timeout={optionalTimeoutInMilliseconds}
 *   component={MyChildComponent}
 *   someProp={somePropPassedThrough} someOtherProp={anotherProp} />
 *
 * @example
 * // With children as function:
 * <PromiseWrap promise={myPromise} timeout={optionalTimeoutInMilliseconds}>
 *   { (props) => <MyChildComponent {...props} /> }
 * </PromiseWrap>
 */

type PromiseProps = {
  data: any
  error: any
  loading: boolean
  loadingSlowly: boolean
}

export type ChildProps = PromiseProps & {
  promise: Promise<any>
  [prop: string]: any
}

export type ComponentType = { component?: React.ComponentType }
export type ChildType = ({ promise, loading, error, data, loadingSlowly, ...props } : ChildProps) => React.ReactNode

type PromiseWrapProps = {
  children?: React.ReactNode | ChildType,
  component?: React.ComponentType<ChildProps>
  promise: Promise<any>
  timeout?: number
  staleWhileLoading?: boolean
  [prop: string]: any
} & (ComponentType | ChildType)

type PromiseWrapState = {
  promise: Promise<any>
} & PromiseProps

class PromiseWrap extends React.PureComponent<PromiseWrapProps, PromiseWrapState> {
  constructor (props: PromiseWrapProps) {
    super(props)
    const { promise, timeout } = this.props
    if (timeout && promise) {
      this.setupTimeout(timeout, promise)
    }
    this.state = { loading: true, error: null, data: null, promise, loadingSlowly: false }
  }

  componentDidMount () {
    const { promise } = this.state
    if (promise) {
      promise.then(
        data => this.setState({ loading: false, data }),
        error => this.setState({ loading: false, error }))
    }
  }

  componentDidUpdate (oldProps: PromiseWrapProps) {
    const { promise: oldPromise } = oldProps
    const { promise: newPromise, timeout } = this.props

    if (oldPromise !== newPromise) {
      this.setState({
        promise: newPromise,
        loading: true,
        data: this.props.staleWhileLoading ? this.state.data : null,
        error: null,
        loadingSlowly: false
      })

      if (timeout && newPromise) {
        this.setupTimeout(timeout, newPromise)
      }

      if (newPromise) {
        newPromise.then(
          data => this.setState({ loading: false, data }),
          error => this.setState({ loading: false, error }))
      }
    }
  }

  setupTimeout (timeout: number, promise: Promise<any>) {
    const race = Promise.race([promise, resolveAfter(timeout, 'timeout')])
    race.then(
      result => {
        if (result === 'timeout') {
          this.setState({ loadingSlowly: true })
        }
      },
      () => { /* handled in componentDidMount or componentDidUpdate */ }
    )
  }

  render () {
    const { children, component: ChildComponent, promise: _promise, timeout, ...props } = this.props
    const { loading, error, data, promise, loadingSlowly } = this.state
    if (children) {
      return (children as ChildType)({ ...props, promise, loading, error, data, loadingSlowly })
    } else {
      return <ChildComponent {...props} promise={promise} loading={loading} error={error} data={data} loadingSlowly={loadingSlowly} />
    }
  }
}

export default PromiseWrap
