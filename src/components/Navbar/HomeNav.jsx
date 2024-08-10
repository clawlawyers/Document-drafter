import React from 'react'
import UserModal from '../Modals/UserModal'
const HomeNav = ({setLoginPopup , isLoggedIn , className}) => {
  return (
    <div className={`${className} flex flex-row justify-between`}>
          <button className="px-10 py-2 border-white rounded-[0.3125rem] border-2">
            CLAW Home
          </button>
          {isLoggedIn ? (
            <button
              onClick={() => setLoginPopup(true)}
              className="px-14 py-2 font-sans bg-customBlue border-black rounded-[0.3125rem] border-2 "
            >
              Log In
            </button>
          ) : (
            <UserModal/>
          )}
        </div>
  )
}

export default HomeNav