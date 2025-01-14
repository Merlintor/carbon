import React from 'react'
import Link from 'next/link'
import firebase, { login, logout } from '../lib/client'

import Button from './Button'
import Popout, { managePopout } from './Popout'
import { useAuth } from './AuthContext'

function Drawer(props) {
  return (
    <Popout hidden={!props.isVisible} pointerLeft="14px" style={{ width: '160px', left: 0 }}>
      <div className="flex">
        <Link href="/snippets">
          <Button large center padding="0.5rem 0" style={{ borderBottom: '1px solid' }}>
            <img src="/static/svg/snippets.svg" alt="Snippets page" width="16px" /> Snippets{' '}
            {/* FILES? */}
          </Button>
        </Link>
        <Link href="/account">
          <Button large center padding="0.5rem 0" style={{ borderBottom: '1px solid' }}>
            <img
              src="/static/svg/person.svg"
              alt="Account"
              width="16px"
              style={{ left: '-2px', marginRight: 'calc(1rem - 3px)' }}
            />{' '}
            Account
          </Button>
        </Link>
        <Button large center padding="0.5rem 0" onClick={logout}>
          Sign Out
        </Button>
      </div>
      <style jsx>
        {`
          .flex {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          img {
            position: relative;
            margin-right: 1rem;
          }
        `}
      </style>
    </Popout>
  )
}

function LoginButton({ isVisible, toggleVisibility }) {
  const user = useAuth()

  if (!firebase) {
    return null
  }

  return (
    <div>
      <Button
        center
        border
        large
        padding="0 16px"
        color="white"
        className="profile-button"
        onClick={() => {
          if (!user) {
            const provider = new firebase.auth.GithubAuthProvider()
            provider.setCustomParameters({
              allow_signup: 'true'
            })
            login(provider)
          } else {
            toggleVisibility()
          }
        }}
      >
        <img
          height={20}
          src={user ? user.photoURL : '/static/svg/github.svg'}
          alt={user ? user.displayName : 'GitHub'}
        />
        <span>{user ? user.displayName : 'Sign in/up'}</span>
      </Button>
      <Drawer isVisible={user && isVisible} />
      <style jsx>
        {`
          div,
          div :global(.profile-button) {
            position: relative;
            height: 100%;
          }
          div :global(.profile-button) {
            max-width: 142px;
            min-height: 40px;
          }
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            border-radius: 50%;
            margin-right: 16px;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(LoginButton)
