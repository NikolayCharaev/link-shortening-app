'use client';
import { useState, ChangeEvent, FormEvent, useContext, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Card, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import { AuthContext } from './Context';

interface SetSqueezeProps {
  fetchLinks: () => void;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetSqueeze: FC<SetSqueezeProps> = ({ fetchLinks, modal, setModal }) => {
  //@ts-ignore
  const { token } = useContext(AuthContext);
  const [linkValue, setLinkValue] = useState('');

  async function getSqeeze(e: FormEvent) {
    e.preventDefault();
    try {
      const encodedLinkValue = encodeURIComponent(linkValue);
      const { data } = await axios.post(
        `https://front-test.hex.team/api/squeeze?link=${encodedLinkValue}`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchLinks();
    } catch (err) {
      console.log(err);
    } finally {
      setModal(false);
      setLinkValue('')
    }
  }

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
          exit={{ opacity: 0 }}
          className="absolute  inset-0 flex items-center justify-center ">
          <Card
            placeholder=""
            color="white"
            shadow={false}
            className=" mt-20 shadow-md w-max p-10 realtive">
            <div className="absolute top-6 right-6" onClick={() => setModal(false)}>
              <IoMdCloseCircle className="cursor-pointer" size={35} />
            </div>
            <Typography placeholder="" variant="h4" color="blue-gray">
              Создать ссылку
            </Typography>

            <form onSubmit={(e) => getSqeeze(e)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography placeholder="" variant="h6" color="blue-gray" className="-mb-3">
                  введите ссылку
                </Typography>
                <Input
                  crossOrigin="anonymous"
                  value={linkValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkValue(e.target.value)}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
              </div>

              <Button placeholder="" color="indigo" className="mt-6" fullWidth type="submit">
                Создать
              </Button>
            </form>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SetSqueeze;
