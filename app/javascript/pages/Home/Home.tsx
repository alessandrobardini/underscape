import React from 'react'
import logo from 'images/magaloop_logo_color.png'
import axios from 'axios'
import './Home.scss'
import csrfToken from 'helpers/csrfToken'
import Form from 'components/Layout/Form'
import Input from 'ui/Input'
import Button from 'ui/Button'

const Home: React.FC = () => {
  const handleSubmit = ({name, password}) => {
    userExists(name).then(({ data: { exists }}) => {
      exists ? signIn(name, password) : signUp(name, password)
    })
  }

    return <div className='Home'>
      <div className='container'>
        <h1>Online Company Event</h1>
        <h1>March 2022</h1>
        <p>Powered by the engineering team</p>
        <img src={logo}></img>
        <p>TODO: Text providing a short introduction to the game...</p>

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
                placeholder='Team name'
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
                placeholder='Password'
              />
              <Button size='l' className='m-t-md' submit type='primary'>Start the game!</Button>
            </>
        )}
        </Form>
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

export const signIn = (name, password) => {
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
  ).then(() => window.location.replace('/app/overview')).catch(() => window.alert('error'))
}

export const signUp = (name, password) => {
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
  ).then(() => window.location.replace('/app/overview')).catch(() => window.alert('error'))
}


export default Home