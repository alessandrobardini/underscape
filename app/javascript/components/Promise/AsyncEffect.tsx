import React from 'react'

/**
 * AsyncEffect is a component to facilitate performing an asynchronous
 * side-effect returning a promise (like an HTTP request), and updating the UI
 * showing a loading state, an error state and a success state.
 *
 * The child component(s) will be rendered with the following props:
 *
 *   - perform: a function that performs the side effect when called
 *   - loading: a boolean indicating whether the effect is being performed
 *   - error: the rejection error if the promise is rejected, otherwise null
 *   - data: the resolved value if the promise resolves, otherwise null
 *   - any other prop passed to AsyncEffect
 *
 * The child component(s) to be rendered can be specified in two ways:
 *
 *   - Passing a child component prop
 *   - Passing a function as children, which will be called with `perform` as
 *   the first argument, and all the other props as the second argument
 *
 * The side effect will be performed when `perform` is called, or automatically
 * when the component mounts if the prop `performOnMount` is set to `true` (by
 * default it is `false`, so the effect is performed "manually" by calling
 * `perform`)
 *
 * @example
 * // With a component prop:
 * <AsyncEffect
 *   perform={functionReturningPromise}
 *   component={MyChildComponent}
 *   someProp={somePropPassedThrough} someOtherProp={anotherProp} />
 *
 * @example
 * // With children as function:
 * <AsyncEffect perform={functionReturningPromise}>
 *   { (perform, props) => <MyChildComponent {...props} perform={perform} /> }
 * </AsyncEffect>
 */

type PerformSignature = (...args: any[]) => Promise<any>

type ChildTypeProps<P extends PerformSignature> = {
  perform: P
  [prop: string]: any
}

type PromiseProps = {
  loading?: boolean
  data?: any
  error?: any
  [prop: string]: any
}

export type AsyncEffectResultProps<P extends PerformSignature> = {
  perform: P
} & PromiseProps

type ChildType<P extends PerformSignature> = (
  perform: P,
  { loading, data, error, ...props } : any
) => React.ReactNode

type AsyncEffectProps<P extends PerformSignature> = {
  children?: React.ReactNode | ChildType<P>,
  component?: React.ComponentType<ChildTypeProps<P>>
  perform: P
  performOnMount?: boolean
  [prop: string]: any
}

type AsyncEffectState<P extends PerformSignature> = {
  perform: P
  loading: boolean
  error: any
  data: any
}

class AsyncEffect<T extends PerformSignature> extends React.PureComponent<AsyncEffectProps<T>, AsyncEffectState<T>> {
  constructor (props: AsyncEffectProps<T>) {
    super(props)
    const perform = this.wrapPerform(props.perform) as any
    this.state = { loading: false, error: null, data: null, perform }
  }

  componentDidMount () {
    const { performOnMount } = this.props
    const { perform } = this.state

    if (performOnMount === true) {
      perform()
    }
  }

  wrapPerform (perform: PerformSignature) {
    return (...args) => {
      const promise = perform(...args)
      this.setState({ loading: true })
      return promise.then(
        (data) => {
          this.setState({ loading: false, error: null, data })
          return data
        },
        (error) => {
          this.setState({ loading: false, data: null, error })
          throw error
        }
      )
    }
  }

  render () {
    const { children, perform: _, performOnMount: __, component: ChildComponent, ...props } = this.props
    const { loading, error, data, perform } = this.state
    if (children) {
      return (children as ChildType<T>)(perform, { ...props, loading, error, data })
    } else {
      return <ChildComponent {...props} perform={perform} loading={loading} error={error} data={data} />
    }
  }
}

export default AsyncEffect
