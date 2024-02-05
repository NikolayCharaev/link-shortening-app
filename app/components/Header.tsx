'use client';
import { useEffect, useState, useContext } from 'react';
import { IoHome } from 'react-icons/io5';

import { Button, Tooltip, Avatar } from '@material-tailwind/react';
import { IoIosExit } from 'react-icons/io';

import { FaUserPlus, FaUserPen } from 'react-icons/fa6';
import { AuthContext } from './Context';
import Link from 'next/link';

const Header = () => {
    //@ts-ignore
  const { isAuthenticated, setToken, token } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(window.localStorage.getItem('username') || '');
  }, [isAuthenticated]);

  return (
    <header className="bg-[#0da9d9] text-white py-6">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="">
            <Link href="/">
              <Tooltip className="bg-[#3949ab]" content="На главную">
                <Button placeholder='' color="indigo">
                  <IoHome size={20} />
                </Button>
              </Tooltip>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {username.length > 0 && (
              <Tooltip className="bg-[#3949ab]" content={username}>
                <Avatar placeholder='' src="https://scientificrussia.ru/images/b/teb-full.jpg" alt="avatar" />
              </Tooltip>
            )}
            {token && (
              <Tooltip className="bg-[#3949ab]" content="Выход">
                <Button placeholder='' onClick={() => {
                  setToken('')
                  window.localStorage.removeItem('token')
                  window.localStorage.removeItem('username')
                }} color="indigo">
                  <IoIosExit size={20} />
                </Button>
              </Tooltip>
            )}

            <Link href="/login">
              <Tooltip className="bg-[#3949ab]" content="Авторизация">
                <Button placeholder='' color="indigo">
                  <FaUserPen size={20} />
                </Button>
              </Tooltip>
            </Link>

            <Link href="/register">
              <Tooltip className="bg-[#3949ab]" content="Регистрация">
                <Button placeholder='' color="indigo">
                  <FaUserPlus size={20} />
                </Button>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
