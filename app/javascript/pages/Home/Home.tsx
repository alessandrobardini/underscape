import React, { useContext } from 'react'
import logo from 'images/underscape.png'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Form from 'components/Layout/Form'
import Input from 'ui/Input'
import Button from 'ui/Button'
import Link from 'ui/Link'
import { TranslatorContext } from 'containers/TranslatorLoader'
import { useHistory } from 'react-router-dom'

import './Home.scss'

const LOCALES = [
  { flag: '🇬🇧', code: 'en'},
  { flag: '🇮🇹', code: 'it'}
]

const Home: React.FC = () => {
  const history = useHistory()

  const i18n = useContext(TranslatorContext)

  const handleSubmit = ({name, password}) => {
    userExists(name).then(({ data: { exists }}) => {
      exists ? signIn(name, password, i18n.locale) : signUp(name, password, i18n.locale)
    })
  }

  const onFlagClick = (code: string) => {
    history.push(`/app/${code}`)
  }

    return <div className='Home'>
      <div className='container left'>
        <img src={logo}></img>
        <div className='explanation'>
          <p>{i18n.t('home.introduction.1')}</p>
          <p>{i18n.t('home.introduction.2')}</p>
          <p>{i18n.t('home.introduction.3')}</p>
          <p>{i18n.t('home.introduction.4')}</p>
        </div>
        <div className='suggestions'>
          <p>{i18n.t('home.rules.title')}</p>
          <ul>
            <li>{i18n.t('home.rules.explanation.1')}</li>
          </ul>
        </div>
        <div className='suggestions'>
          <p>{i18n.t('home.bag.title')}</p>
          <ul>
            <li>{i18n.t('home.bag.explanation.1')}</li>
            <li>{i18n.t('home.bag.explanation.2')}</li>
          </ul>
        </div>
        <div className='suggestions'>
          <p>{i18n.t('home.credits.title')}</p>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: i18n.t('home.credits.explanation.1')}}/>
          </ul>
        </div>
        <div className='languages'>
          {LOCALES.map(({ flag, code }) => {
            return <span 
              key={code} 
              className={i18n.locale === code ? 'selected' : ''}
              {...(code !== i18n.locale && { onClick: () => onFlagClick(code) })}
            >
              {flag}
            </span>
          })}
        </div>
      </div>
      <div className='container right'>
        <Form onSubmit={handleSubmit} initialValues={{name: '', password: ''}}>
          {({ errors, touched, values, setFieldValue }) => (
              <>
                <Input
                  label='Team name'
                  formik
                  name='name'
                  errors={errors}
                  touched={touched}
                  value={values.name}
                  setFieldValue={setFieldValue}
                  placeholder={i18n.t('home.input.team_name')}
                />
                <Input
                  label='Password'
                  formik
                  type='password'
                  name='password'
                  errors={errors}
                  touched={touched}
                  value={values.password}
                  setFieldValue={setFieldValue}
                  placeholder={i18n.t('home.input.password')}
                />
                <Button size='l' disabled={!(values.password && values.name)} className='m-t-md' submit type='primary'>{i18n.t('home.input.start')}</Button>
              </>
          )}
        </Form>
        <div className='hall-of-fame'>
          <Link to={`/app/${i18n.locale}/hall_of_fame`}>Hall of Fame</Link>
        </div>
      </div>
    </div>
}

export const userExists = (name) => {
  return axios.post(
    '/users/sessions/exists',
    {
      user: {
        name
      },
      authenticity_token: csrfToken()
    },
    {
      headers: { Accept: 'application/json' },
      responseType: 'json'
    }
  )
}

export const signIn = (name: string, password: string, locale: string) => {
  return axios.post(
    '/users/sign_in',
    {
      user: {
        name,
        password
      },
      authenticity_token: csrfToken()
    },
    {
      headers: { Accept: 'application/json' },
      responseType: 'json'
    }
  ).then(() => window.location.replace(`/app/${locale}/map`)).catch(() => window.alert('error'))
}

export const signUp = (name: string, password: string, locale: string) => {
  return axios.post(
    '/users',
    {
      user: {
        name,
        password
      },
      authenticity_token: csrfToken()
    },
    {
      headers: { Accept: 'application/json' },
      responseType: 'json'
    }
  ).then(() => window.location.replace(`/app/${locale}/map`)).catch(() => window.alert('error'))
}


export default Home