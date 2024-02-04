'use client';
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Typography, Card, Button } from '@material-tailwind/react';
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

  async function fetchLinks() {
    try {
      const { data } = await axios.get(
        `https://front-test.hex.team/api/statistics?offset=${pagination}&limit=10`,
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
  }, [pagination]);
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
      {links.length <= 0 && (
        <Card className="p-8 mt-10 flex flex-row justify-between">
          <Typography variant="h5">
            У вас тут пока ничего нет, давайте сократим нашу первую ссылку :){' '}
          </Typography>

          <Button color="indigo" className="w-max" onClick={() => setModal(true)}>
            Создать
          </Button>
        </Card>
      )}

      {token && links.length > 0 && (
        <>
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
      )}

      <SetSqueeze fetchLinks={fetchLinks} modal={modal} setModal={setModal} />
    </motion.div>
  );
};

export default LinksWrapper;