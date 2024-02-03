'use client';
import React from 'react';
import { IoHome } from 'react-icons/io5';

import { Button, Tooltip } from '@material-tailwind/react';
import { FaUserPlus,FaUserPen } from "react-icons/fa6";


import Link from 'next/link';
const Header = () => {
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
