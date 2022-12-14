import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import CurrentUser from '../CurrentUser/CurrentUser'
import './Header.css'

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { loggedIn } = useContext(CurrentUserContext);

  const burgerClassName = isMenuOpen ? 'header__burger header__burger_opened' : 'header__burger';

  const handleBurgerClick = (e) => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!loggedIn) {
      setIsMenuOpen(false);
    }
  }, [loggedIn])

  return (
    <>
      {isMenuOpen && <CurrentUser />}
      <header className="header">
        <a href="#" className="header__logo" />
        {pathname === '/sign-up' && <Link className="header__not-logged-in" to={'/sign-in'}>Войти</Link>}
        {pathname === '/sign-in' && <Link className="header__not-logged-in" to={'/sign-up'}>Регистрация</Link>}
        {
          pathname === '/' && (
            <>
              <button onClick={handleBurgerClick} className={burgerClassName} />
              <CurrentUser className='header__current-user' />
            </>
          )
        }
      </header >
    </>
  )
}

export default Header