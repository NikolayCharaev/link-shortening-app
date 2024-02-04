'use client';
import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { Card, Input, Button, Typography, Alert } from '@material-tailwind/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from './Context';

import { useRouter } from 'next/navigation';

interface IFormProps {
  type: string;
}
const Form = ({ type }: IFormProps) => {
  const { setAuthenticated, isAuthenticated, setToken } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');

  const [status, setStatus] = useState('pending');
  const [pervomed, setPerfomed] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (type === 'login') {
        const { data } = await axios.post('https://front-test.hex.team/api/login', {
          username: userName,
          password: userPassword,
        });

        if ('access_token' in data) {
          window.localStorage.setItem('token', data.access_token);
          setToken(data.access_token)
          window.localStorage.setItem('username', userName);
          setPerfomed(true);
          setStatus('success');
          setAuthenticated(true);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      }

      if (type === 'register') {
        const { data } = await axios.post(
          `https://front-test.hex.team/api/register?username=${userName}&password=${userPassword}`,
        );

        if (data) {
          setPerfomed(true);
          window.localStorage.removeItem('username');
          setStatus('success');

          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      }
    } catch (err) {
      setStatus('fail');
      setPerfomed(true);
      console.log(err);
    } finally {
      setTimeout(() => {
        setPerfomed(false);
      }, 1000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      exit={{ opacity: 0 }}
      >
      <AnimatePresence>
        {pervomed && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-10 right-10">
            {status === 'success' && (
              <Alert color="blue">
                {type === 'register'
                  ? 'Регистрация прошла успешно, можете авторизоваться'
                  : 'Авторизация успешна'}
              </Alert>
            )}
            {status === 'fail' && (
              <Alert color="red">Произошла ошибка, проверьте введенные данные</Alert>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Card shadow={false} className="flex justify-center items-center mt-32 bg-[#e0f7fa] py-10">
        <Typography variant="h4" color="blue-gray">
          {type === 'login' ? 'Авторизация' : 'Регистрация'}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {type === 'register'
            ? 'Рад встрече! Введите свои данные для регистрации.'
            : 'Рад встрече! Введите свои данные для авторизации.'}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Имя пользователя
            </Typography>
            <Input
              value={userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
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
              value={userPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            {type === 'login' ? 'У вас нет аккаунта? ' : 'У вас есть аккаунт? '}
            <Link
              href={type === 'login' ? '/register' : '/login'}
              className="font-medium text-gray-900">
              {type === 'login' ? 'Регистрация' : 'Войти'}
            </Link>
          </Typography>
        </form>
      </Card>
    </motion.div>
  );
};

export default Form;
