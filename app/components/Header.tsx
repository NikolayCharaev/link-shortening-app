'use client';
import { useEffect, useState, useContext } from 'react';
import { IoHome } from 'react-icons/io5';

import { Button, Tooltip, Avatar } from '@material-tailwind/react';
import { FaUserPlus, FaUserPen } from 'react-icons/fa6';
import { AuthContext } from './Context';
import Link from 'next/link';

const Header = () => {
  const { setAuthenticated, isAuthenticated } = useContext(AuthContext);
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
                <Button color="indigo">
                  <IoHome size={20} />
                </Button>
              </Tooltip>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ||
              (username && (
                <Tooltip className="bg-[#3949ab]" content={window.localStorage.getItem('username')}>
                  <Avatar src="https://scientificrussia.ru/images/b/teb-full.jpg" alt="avatar" />
                </Tooltip>
              ))}

            <Link href="/login">
              <Tooltip className="bg-[#3949ab]" content="Авторизация">
                <Button color="indigo">
                  <FaUserPen size={20} />
                </Button>
              </Tooltip>
            </Link>

            <Link href="/register">
              <Tooltip className="bg-[#3949ab]" content="Регистрация">
                <Button color="indigo">
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
