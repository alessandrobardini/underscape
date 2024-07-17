import React from 'react'
import logo from 'images/underscape.png'
import axios from 'axios'
import csrfToken from 'helpers/csrfToken'
import Form from 'components/Layout/Form'
import Input from 'ui/Input'
import Button from 'ui/Button'

import './Home.scss'
import Link from 'ui/Link'

const Home: React.FC = () => {
  const handleSubmit = ({name, password}) => {
    userExists(name).then(({ data: { exists }}) => {
      exists ? signIn(name, password) : signUp(name, password)
    })
  }

    return <div className='Home'>
      <div className='container left'>
        <img src={logo}></img>
        <div className='explanation'>
          <p>Are you ready to enter a mysterious kingdom?</p>
          <p>An evil king is reigning mercilessy with the help of his four minions!</p>
          <p>As a valiant knight, you are asked to defeat them and enter the king's castle!</p>
          <p>Hurry up, the kingdom needs your help!</p>
        </div>
        <div className='suggestions'>
          <p>Rules</p>
          <ul>
            <li>You have 60 minutes to clear the game. Once you register, the timer starts!</li>
          </ul>
        </div>
        <div className='suggestions'>
          <p>The bag</p>
          <ul>
            <li>During your adventure, you will find some objects. You can have a look at them in every moment, by clicking on the bag icon on the top left</li>
            <li>The objects you'll find are vital to solve the riddles! Don't overlook them!</li>
          </ul>
        </div>
        <div className='suggestions'>
          <p>Credits</p>
          <ul>
            <li>Inspired by the videogame <a href='https://undertale.com/' target='_blank'>Undertale</a>. All the characters images are fan-art found on the web</li>
          </ul>
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
                <Button size='l' disabled={!(values.password && values.name)} className='m-t-md' submit type='primary'>Start the game!</Button>
              </>
          )}
        </Form>
        <div className='hall-of-fame'>
          <Link to='/app/hall_of_fame'>Hall of Fame</Link>
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
  ).then(() => window.location.replace('/app/map')).catch(() => window.alert('error'))
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
  ).then(() => window.location.replace('/app/map')).catch(() => window.alert('error'))
}


export default Home