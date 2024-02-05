'use client';
import { useEffect, useState, useContext, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Typography, Card, Button, Select, Option } from '@material-tailwind/react';
import Link from 'next/link';
import axios from 'axios';

import LinksList from './LinksList';
import SetSqueeze from './SetSqueeze';
import { AuthContext } from './Context';

const LinksWrapper = () => {
  //@ts-ignore
  const { token } = useContext(AuthContext);

  const [links, setLinks] = useState([]);
  const [modal, setModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState<string>('asc_short');

  async function fetchLinks() {
    try {
      // if (!token) {
      //   return
      // }
      const { data } = await axios.get(
        `https://front-test.hex.team/api/statistics?order=${selectedOrder}&offset=${pagination}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      );

      setLinks(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, [pagination, token, selectedOrder]);

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      exit={{ opacity: 0 }}>
      {!token && (
        <Card className="p-8 mt-10 flex flex-row justify-between">
          <Typography variant="h5">Для начала работы вам необходимо авторизоваться :)</Typography>
          <Link href="/login">
            <Button color="indigo" className="w-max">
              войти
            </Button>
          </Link>
        </Card>
      )}
      {links.length <= 0 && token && (
        <Card className="p-8 mt-10 flex flex-row justify-between">
          <Typography variant="h5">
            У вас тут пока ничего нет, давайте сократим нашу первую ссылку :){' '}
          </Typography>

          <Button color="indigo" className="w-max" onClick={() => setModal(true)}>
            Создать
          </Button>
        </Card>
      )}

      {token && links.length > 0 ? (
        <>
          <div className="w-96 mb-10">
            <Select
              label="сортировать по"
              value={selectedOrder}
              onChange={(select : string) => {
                if (select) {
                  setSelectedOrder(select);
                }
              }}>
              <Option value="asc_short">короткая ссылка по возрастанию</Option>
              <Option value="desc_short">короткая ссылка по убыванию</Option>
              <Option value="asc_target">длинная ссылка по возрастанию</Option>
              <Option value="desc_target">длинная ссылка по убыванию</Option>
              <Option value="asc_counter">количество посещений по возрастанию</Option>
              <Option value="desc_counter">количество посещений по убыванию</Option>
            </Select>
          </div>

          <LinksList modal={modal} fetchLinks={fetchLinks} setModal={setModal} arr={links} />
          <div className=" flex items-center justify-center gap-10">
            <Button
              onClick={() => {
                setPagination((prev) => prev - 10);
              }}
              disabled={pagination <= 0}
              color="indigo">
              пред.
            </Button>
            <Button
              onClick={() => {
                setPagination((prev) => prev + 10);
              }}
              disabled={links.length < 10}
              color="indigo">
              след.
            </Button>
          </div>
        </>
      ) : (
        ''
      )}
      <SetSqueeze fetchLinks={fetchLinks} modal={modal} setModal={setModal} />
    </motion.div>
  );
};

export default LinksWrapper;
