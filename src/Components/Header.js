import React, { useState, useEffect, useRef } from 'react'
import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../assets/ult-stats-favicon.svg'

export default function Header(props) {

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // check for mouseClick outside of profile menu to close
  const profileMenu = useRef();
  const profileImg = useRef();
  useEffect(() => {

    function handleClick(e) {
      if (profileMenuOpen && 
        (profileMenu.current.contains(e.target) || profileImg.current.contains(e.target))) {
          return;
        }
      else setProfileMenuOpen(false);
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })

  let location = useLocation().pathname;

  return (
    <header className='App-header'>
      <img className="App-logo" src={Logo} alt='Site Logo'></img>
      <h1 className={props.user ? 'header-title-user' : 'header-title-nouser'}>Ultimate Stats</h1>
      <div className='header-right'>
        <div className='nav-links'>
          <Link
            className={`btn text-btn nav-link ${location === '/' ? 'nav-active' : ''}`}
            to='/'
          >Home</Link>
          <Link
            className={`btn text-btn nav-link ${location === '/teams' ? 'nav-active' : ''}`}
            to='/teams'
          >Teams</Link>
          <Link
            className={`btn text-btn nav-link ${location === '/games' ? 'nav-active' : ''}`}
            to='/games'
          >Games</Link>
        </div>
        <div className='nav-user'>
          {props.user && props.user.photoURL &&
            <img
              className='profile-img'
              src={props.user.photoURL}
              alt='Profile'
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              ref={profileImg}
            />
          }
          {props.user && !props.user.photoURL &&
            <span
              className='material-icons md-36 profile-img'
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              ref={profileImg}
            >account_circle</span>
          }
          {props.user && profileMenuOpen &&
            <div ref={profileMenu} className='profile-menu card'>
              <button className='btn text-btn header-btn' onClick={() => {
                // Confirmation Modal for Logout if there is an active game
                if (props.currentGame) props.setLogOutWarning(true);
                else props.firebaseApp.auth().signOut();
              }}>Sign Out</button>
            </div>
          }
        </div>
      </div>
      {location !== '/stats' &&
        <div className='btm-nav'>
          <Link to='/' className={`btm-nav-item ${location === '/' ? 'nav-btm-active' : ''}`}>
            <span className='material-icons'>home</span>
            <span>Home</span>
          </Link>
          <Link to='/teams' className={`btm-nav-item ${location === '/teams' ? 'nav-btm-active' : ''}`}>
            <span className='material-icons'>group</span>
            <span>Teams</span>
          </Link>
          <Link to='/games' className={`btm-nav-item ${location === '/games' ? 'nav-btm-active' : ''}`}>
            <span className='material-icons'>bar_chart</span>
            <span>Games</span>
          </Link>
        </div>}
    </header>
  )
}