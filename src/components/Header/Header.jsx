import { useRef, useEffect } from 'react'
import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import  useAuth  from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'

import logo from '../../assets/images/eco-logo.png'
import usericon from '../../assets/images/user-icon.png'

import {Container, Row} from 'reactstrap'
import { toast } from 'react-toastify'

const nav__links = [
  {
    path: 'home',
    display: 'home'
  },
  {
    path: 'shop',
    display: 'shop'
  },
  {
    path: 'cart',
    display: 'cart'
  },

]


const Header = () => {

  const headerRef = useRef(null)

  const menuRef = useRef(null)

  const navigate = useNavigate()

  const { currentUser } = useAuth()

  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const profileActionRef = useRef(null)

  const stickyHeaderFunc = () =>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || 
         document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      } else{
        headerRef.current.classList.remove('sticky__header')
      }
    });
  };

  const logout = () =>{
    signOut(auth).then(()=>{
      toast.success('logged out')
      navigate('/home')
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  useEffect(()=>{
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const navigateToCart = () =>{
    navigate('/cart')
  }

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="" />
              <div>
                <h1>Multimart</h1>
                {/* <p>Since 1855</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                 nav__links.map((item, index) =>(
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={(navClass)=>
                      navClass.isActive ? 'nav__active' : ''}> 
                      {item.display}
                    </NavLink>
                  </li>
                 )) 
                }
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i className='ri-shopping-bag-line'></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className='profile'>
                <img src={ currentUser? currentUser.photoURL : usericon} alt="" onClick={toggleProfileActions} />
                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                    <span onClick={logout}>Logout</span>
                    ) : (
                      <div className='d-flex align-items-center justyfity-content-center flex-column'>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/dashboard'>Dashboard</Link>
                      </div>  
                    )
                  }
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
              </div>
            </div>  
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header