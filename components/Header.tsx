// Instruments
import { BellIcon, SearchIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../tools/hooks/useAuth'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="header__link">
            <a href="">Home</a>
          </li>
          <li className="header__link">
            <a href="">TV Shows</a>
          </li>
          <li className="header__link">
            <a href="">Movies</a>
          </li>
          <li className="header__link">
            <a href="">New & Popular</a>
          </li>
          <li className="header__link">
            <a href="">My List</a>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden h-6 w-6 sm:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link
          // href="/account"
          href="/login"
          onClick={logout}
        >
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

