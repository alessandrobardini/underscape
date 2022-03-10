import React, { forwardRef, ForwardRefExoticComponent, HTMLProps, RefAttributes } from 'react'
import {
  Formik,
  Field as FormikField,
  FormikValues,
  FormikConfig,
  FormikProps,
  FormikErrors,
  FormikTouched,
  FormikHelpers,
  FieldConfig
} from 'formik'
import get from 'lodash/get'
import './Form.scss'

/*
 * Usage:
 *
 * ```javascript
 * <Form onSubmit={(values) => console.log(values)} initialValues={{ name: '', address: '' }}>
 *   {
 *     ({ errors, touched }) => (
 *       <>
 *         <Field errors={errors} touched={touched}
 *           placeholder='Shop name' type='text' name='name'
 *           validate={validateAll([presence(), length({ minimum: 3 })])} />
 *
 *         <Field errors={errors} touched={touched}
 *           label='Address' type='text' name='address'
 *           validate={presence()} className='form-control' />
 *
 *         <button type='submit' className='btn btn-primary'>Submit</button>
 *       </>
 *     )
 *   }
 * </Form>
 * ```
 */

type FormProps = FormikConfig<FormikValues> & {
  children: (
    props: Omit<FormikProps<FormikValues>, 'handleSubmit'>
  ) => React.ReactNode
  className?: string
}

const Form: React.FC<FormProps> = props => {
  const {
    enableReinitialize,
    isInitialValid,
    initialStatus,
    initialValues,
    onReset,
    onSubmit,
    validate,
    validateOnBlur,
    validateOnChange,
    validationSchema,
    validateOnMount,
    children,
    ...formProps
  } = props

  const formikProps = {
    enableReinitialize,
    isInitialValid,
    initialStatus,
    initialValues,
    onReset,
    onSubmit,
    validate,
    validateOnBlur,
    validateOnChange,
    validationSchema,
    validateOnMount
  }

  return (
    <Formik {...formikProps}>
      {({ handleSubmit, ...props }) => (
        <form onSubmit={handleSubmit} {...formProps}>
          {children(props)}
        </form>
      )}
    </Formik>
  )
}

type FieldProps = FieldConfig &
  Omit<HTMLProps<HTMLInputElement>, 'label'> & {
    errors: FormikErrors<FormikValues>
    touched: FormikTouched<FormikValues>
    setFieldValue?: FormikHelpers<FormikValues>['setFieldValue']
    type?: string
    label?: string | JSX.Element
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>
    otherComponents?: React.ReactNode[]
    inlineLabel?: string
    icon?: string
    onIconClick?: () => void
    button?: JSX.Element
    rounded?: boolean
    noClear?: boolean
}

const Field: ForwardRefExoticComponent<FieldProps & RefAttributes<HTMLInputElement>> =
  forwardRef<HTMLInputElement, FieldProps>(({
    errors,
    touched,
    value,
    setFieldValue,
    name,
    label,
    id,
    wrapperProps,
    otherComponents,
    inlineLabel,
    icon,
    onIconClick,
    button,
    noClear,
    rounded,
    ...props
  }, ref) => {
    const error = get(errors, name) && get(touched, name) && get(errors, name)
    const isCheckbox = props.type === 'checkbox'
    const wrapperClass = isCheckbox ? 'checkbox' : 'form-group'
    const fieldClass = isCheckbox ? '' : `form-control ${inlineLabel ? 'inline-label-input' : ''}`
    const field = (
      <FormikField
        {...props}
        innerRef={ref}
        name={name}
        id={id || name}
        className={`${fieldClass} ${props.className || ''}`}
      />
    )

    const clearInput = () => {
      document.getElementById(id || name).focus()
      setFieldValue && setFieldValue(id || name, '')
    }

    return (
      <div
        {...wrapperProps}
        className={`Field ${wrapperClass} ${icon ? 'with-icon' : ''} ${button ? 'with-button' : ''} ${rounded ? 'rounded' : ''} ${error ? 'has-error' : ''} ${wrapperProps?.className || ''}`}
      >
        {label && (
          <label htmlFor={id || name} className='control-label'>
            {isCheckbox && field}
            {label}
          </label>
        )}
        {!label && props.placeholder && (
          <label htmlFor={id || name} className='control-label'>
            {props.placeholder}
          </label>
        )}
        {icon && <i className={icon} onClick={onIconClick} />}
        {!isCheckbox && field}
        {button}
        {otherComponents && [...otherComponents]}
        {error && <span className='help-block'>{error}</span>}
      </div>
    )
  })

Field.displayName = 'Field'

export { Form, Field }
export default Form
