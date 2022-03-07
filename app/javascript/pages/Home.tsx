import React, { useEffect, useState } from 'react'
import logo from 'images/magaloop_logo_color.png'
import axios, { Axios, AxiosResponse } from 'axios'
import './Home.scss'
import csrfToken from 'helpers/csrfToken'
import AsyncEffect, { AsyncEffectResultProps } from 'components/Promise/AsyncEffect'
import Form from 'components/Layout/Form'
import Input from 'ui/Input'
import Button from 'ui/Button'

const Home: React.FC = () => {
  return (
    <AsyncEffect
      perform={signIn}
      component={HomePage}
    />
  )
}

type HomePageProps = AsyncEffectResultProps<SignIn>

const HomePage: React.FC<HomePageProps> = ({ data, error, perform }) => {
  useEffect(() => {
    if(data !== null ) {
      window.location.replace('/app/overview')
    }
  }, [data])

  useEffect(() => {
    if(error !== null ) {
      window.alert('error')
    }
  }, [error])

  const handleSubmit = ({email, password}) => {
    perform(email, password)
  }

    return <div className='Home'>
      <div className='container'>
        <h1>Online Company Event</h1>
        <h1>March 2022</h1>
        <p>Powered by the engineering team</p>
        <img src={logo}></img>
        <p>TODO: Text providing a short introduction to the game...</p>

        <Form onSubmit={handleSubmit} initialValues={{email: '', password: ''}}>
        {({ errors, touched, values, setFieldValue }) => (
            <>
              <Input
                label='email'
                formik
                name='email'
                errors={errors}
                touched={touched}
                value={values.email}
                setFieldValue={setFieldValue}
                placeholder={'email'}
              />
              <Input
                label='password'
                formik
                type='password'
                name='password'
                errors={errors}
                touched={touched}
                value={values.password}
                setFieldValue={setFieldValue}
                placeholder={'password'}
              />
              <Button size='l' className='m-t-md' submit type='primary'>Start the game!</Button>
            </>
        )}
        </Form>
      </div>
    </div>
}

type SignIn = (email: string, password: string) => Promise<AxiosResponse<any>>

export const signIn = (email, password) => {
  return axios.post(
    '/teams/sign_in',
    {
      team: {
        email,
        password
      },
      authenticity_token: csrfToken()
    },
    {
      headers: { Accept: 'application/json' },
      responseType: 'json'
    }
  )
}

export default Home