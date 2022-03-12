import { Field } from 'components/Layout/Form'
import { FormikErrors, FormikHelpers, FormikTouched, FormikValues } from 'formik'
import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import './Input.scss'

type NotCheckbox<T> = T extends 'checkbox' | 'textarea' | 'select' ? never : T
type TypeProp<T> = NotCheckbox<T>

type TextareaProps = {
  /** HTML input type */
  type: 'textarea'
  placeholder?: string
  value?: string
  icon?: never
  onIconClick?: never
}

type FieldInputProps = {
  /** HTML input type */
  type?: TypeProp<string>
  /** HTML input placeholder */
  placeholder?: string
  /** The name of a fontawesome icon to be rendered inside the input */
  icon?: string
  /** The function triggered when clicking on the icon  */
  onIconClick?: () => void
  /** HTML label */
  label?: string
  /** HTML input value */
  value: string
  /** submit button component */
  button?: JSX.Element
}

type SelectProps = {
  /** HTML input type */
  type: 'select'
  children: React.ReactNode
  value?: string
  placeholder?: string
  icon?: never
  onIconClick?: never
}

type FormikInputProps = {
  /** A boolean value which determines if the input renders as a formik field. */
  formik: boolean
  /** Set value of form field directly */
  setFieldValue: FormikHelpers<FormikValues>['setFieldValue']
  /** An object containing error messages whose keys correspond to FormikValues. */
  errors: FormikErrors<any>
  /** An object containing touched state of the form whose keys correspond to FormikValues. */
  touched: FormikTouched<any>

  wrapperProps?: any
  error?: never
  setValue?: never
}

type HTMLInputProps = {
  /** A boolean value which determines if the input renders as a formik field. */
  formik?: never
  /** A string value which contains an error message. */
  error: string
  errors?: never
  touched?: never
  wrapperProps?: never
  setFieldValue?: never
} & ({
  type: 'textarea'
  setValue?: never
} | {
  type?: TypeProp<string>
  /** Set value of form field directly */
  setValue: (value: string) => void
})

export type InputCommonProps = {
  /** Field name */
  name: string
  /** An optional additional class name to be assigned to the input */
  className?: string
} & {
  [extraPropName: string]: any
}

export type InputProps = InputCommonProps & (FieldInputProps | TextareaProps | SelectProps) & Omit<FormikInputProps | HTMLInputProps, 'placeholder'>

const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> = forwardRef<HTMLInputElement, InputProps>(({
  className,
  errors,
  error,
  touched,
  name,
  placeholder,
  type = 'text',
  setFieldValue,
  setValue,
  value,
  wrapperProps,
  icon,
  onIconClick,
  button,
  label,
  children,
  ...props
}, ref) => {
  const connectedWrapperProps = wrapperProps?.className ? { ...wrapperProps, className: 'Input'.concat(' ', wrapperProps?.className) } : { ...wrapperProps, className: 'Input' }

  return type === 'textarea'
    ? <Textarea {...props} errors={errors} error={error} touched={touched} name={name} placeholder={placeholder} value={value} wrapperProps={connectedWrapperProps} className={className} />
    : type === 'select'
      ? <Select {...props} value={value} errors={errors} touched={touched} type={type} name={name} wrapperProps={connectedWrapperProps} className={className} children={children} placeholder={placeholder} />
      : <InputField {...props} ref={ref} icon={icon} onIconClick={onIconClick} button={button} setFieldValue={setFieldValue} setValue={setValue} errors={errors} error={error} touched={touched} type={type} name={name} placeholder={placeholder} value={value} wrapperProps={connectedWrapperProps} label={label} className={className} />
})

Input.displayName = 'Input'

type InputFieldType = InputCommonProps & FieldInputProps & Omit<FormikInputProps | HTMLInputProps, 'placeholder'>

const InputField: ForwardRefExoticComponent<InputFieldType & RefAttributes<HTMLInputElement>> =
  forwardRef<HTMLInputElement, InputFieldType>(
    ({ formik, type, icon, onIconClick, button, placeholder, id, wrapperProps, setFieldValue, value, name, errors, error, setValue, touched, label, className, ...props }, ref) => {
      const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setValue(value)

      return formik
        ? <Field
        {...props}
        ref={ref}
        wrapperProps={wrapperProps}
        name={name}
        type={type}
        icon={icon}
        onIconClick={onIconClick}
        errors={errors}
        touched={touched}
        button={button}
        placeholder={placeholder}
        inlineLabel={placeholder}
        className={className}
        setFieldValue={setFieldValue}
        value={value}
      /> : (
        <div className={`Input form-group ${className || ''} ${icon ? 'with-icon' : ''} ${button ? 'with-button' : ''} ${error ? 'has-error' : ''}`}>
          {icon && <i className={icon} onClick={onIconClick} />}
          <input {...props} ref={ref} className='form-control' type={type} id={id || name} name={name} value={value} onChange={handleChange} placeholder={placeholder} />
          <span className='inline-label-text'>{placeholder}</span>
          {button}
          { error && <span className='help-block'>{error}</span>}
        </div>
        )
    })

InputField.displayName = 'InputField'

type SelectType = InputCommonProps & SelectProps & Omit<FormikInputProps | HTMLInputProps, 'placeholder'>

const Select: React.FC<SelectType> = ({ type, value, formik, children, wrapperProps, name, errors, touched, className, placeholder, ...props }) =>
  formik
    ? <div className='select-controller' tabIndex={0} data-has-value={!!value}>
        <Field
          {...props}
          tabIndex={-1}
          as='select'
          value={value}
          wrapperProps={wrapperProps}
          name={name}
          errors={errors}
          touched={touched}
          inlineLabel={placeholder}
          className={`${value?.length === 0 ? 'non-selected' : ''} ${className || ''}`}
        >
          {children}
        </Field>
        <i className="fas fa-angle-down"></i>
      </div> : (
      <div className='select-controller' tabIndex={0}>
        <div className={`Input select ${className || ''}`}>
          <select {...props} id={name} name={name} className='form-control' tabIndex={-1}>
            {children}
          </select>
        </div>
        <i className="fas fa-angle-down"></i>
      </div>
    )

type TextareaType = InputCommonProps & Omit<TextareaProps, 'type'> & Omit<FormikInputProps | HTMLInputProps, 'placeholder'>

const Textarea: React.FC<TextareaType> = ({ formik, placeholder, wrapperProps, name, errors, touched, className, id, ...props }) =>
  formik
    ? <Field
      {...props}
      component='textarea'
      placeholder={placeholder}
      wrapperProps={wrapperProps}
      name={name}
      errors={errors}
      touched={touched}
      className={className || ''}
    /> : (
      <div className={`Input textarea ${className || ''}`}>
        <textarea {...props} name={name} id={id || name} className='form-control' placeholder={placeholder} />
      </div>
    )

export default Input
