import React from 'react';
import { Card, Typography, Tooltip, Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const TABLE_HEAD = ['короткая ссылка', 'исходная ссылка', 'кол-во переходов', ''];

const LinksList = ({ arr, modal, setModal,fetchLinks }) => {
  return (
    <motion.div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {arr.map((elem) => {
              const { id, short, target, counter } = elem;
              const isLast = arr.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50 w-max';

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography  variant="small" color="blue-gray" className="font-normal">
                      <Link onClick={() => fetchLinks()} target="blank" href={`https://front-test.hex.team/s/${short}`}>
                        https://front- test.hex.team/s/${short}
                      </Link>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      <Tooltip content={target}>
                        <Link href={target}>
                          <p className="max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
                            {target}
                          </p>
                        </Link>
                      </Tooltip>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {counter}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium">
                      {' '}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Button onClick={() => setModal(true)} color="indigo" className="mt-5">
        Добавить
      </Button>
    </motion.div>
  );
};

export default LinksList;
