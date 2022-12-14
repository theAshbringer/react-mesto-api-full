import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import FormInput from '../shared/FormInput/FormInput'
import FormTitle from '../shared/FormTitle/FormTitle'
import SubmitButton from '../shared/SubmitButton/SubmitButton'
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip/InfoTooltip'

const Register = () => {
  const initialState = { email: '', password: '' }
  const [user, setUser] = useState(initialState);
  const [tooltipState, setTooltipState] = useState({ isOpen: false, isSuccess: false, errorMessage: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(user)
      .then((res) => {
        setTooltipState({ isOpen: true, isSuccess: true, errorMessage: '' })
        setUser(initialState);
      })
      .catch((err) => setTooltipState({ isOpen: true, isSuccess: false, errorMessage: err.message }))
  }

  const handleCloseTooltip = () => {
    setTooltipState({ ...tooltipState, isOpen: false })
    if (tooltipState.isSuccess) {
      navigate('/sign-in');
    }
  }

  return (
    <>
      <div className='form'>
        <FormTitle
          className='form__title'
          inverted={true}>
          Регистрация
        </FormTitle>
        <form
          onSubmit={handleSubmit}>
          <FormInput
            className='form__field'
            placeholder='Email'
            id='email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
            inverted={true}
          />
          <FormInput
            className='form__field'
            placeholder='Пароль'
            id='password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
            inverted={true}
          />
          <SubmitButton
            className='form__btn form__btn_type_register'
            inverted={true}
          >
            Зарегистрироваться
          </SubmitButton>
        </form>
        <Link to='/sign-in'
          className='form__registered'
        >Уже зарегистрированы? Войти
        </Link>
      </div>
      <InfoTooltip
        successful={tooltipState.isSuccess}
        onClose={handleCloseTooltip}
        isOpen={tooltipState.isOpen}
        errorMessage={tooltipState.errorMessage} />
    </>
  )
}

export default Register