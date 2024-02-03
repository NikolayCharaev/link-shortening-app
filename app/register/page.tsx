'use client';
import React from 'react';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import {motion } from 'framer-motion'
const page = () => {
  return (
    <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ ease: "easeOut", duration: .4 }}
        
        exit={{opacity:0}}
    >
    <Card shadow={false} className="flex justify-center items-center mt-32 bg-[#e0f7fa] py-10 ">
      <Typography variant="h4" color="blue-gray">
        Регистрация
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Рад встрече! Введите свои данные для регистрации.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Имя пользователя
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Пароль
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
        </div>

        <Button className="mt-6" fullWidth>
          Регистрация
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          У вас уже есть аккаунт?{' '}
          <Link href="/login" className="font-medium text-gray-900">
            Авторизация
          </Link>
        </Typography>
      </form>
    </Card>
    </motion.div>
  );
};

export default page;
