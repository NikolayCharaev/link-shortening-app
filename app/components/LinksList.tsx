import { FC } from 'react';
import { Card, Typography, Tooltip, Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { FaCopy } from 'react-icons/fa';

import Link from 'next/link';
const TABLE_HEAD = ['короткая ссылка', 'исходная ссылка', 'кол-во переходов', ''];

interface LinkItem {
  id: number;
  target: string;
  short: string;
  counter: number;
}

interface LinksListProps {
  arr: LinkItem[];
  modal: boolean;
  setModal: (modal: boolean) => void;
  fetchLinks: () => void;
}

const LinksList: FC<LinksListProps> = ({ arr, modal, setModal, fetchLinks }) => {
  return (
    <motion.div>
      <Card placeholder="" className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    placeholder=""
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
                  <td className={`${classes} flex items-center gap-4`}>
                    <Typography
                      placeholder=""
                      variant="small"
                      color="blue-gray"
                      className="font-normal max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
                      <Link
                        onClick={() => fetchLinks()}
                        target="blank"
                        href={`https://front-test.hex.team/s/${short}`}>
                        https://front- test.hex.team/s/${short}
                      </Link>
                    </Typography>

                    <Button
                      placeholder=""
                      onClick={() => {
                        navigator.clipboard.writeText('https://front-test.hex.team/s/' + short);
                      }}
                      color="indigo">
                      <FaCopy size={10} />
                    </Button>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder=""
                      variant="small"
                      color="blue-gray"
                      className="font-normal max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
                      <Tooltip content={target}>
                        <Link href={target}>{target}</Link>
                      </Tooltip>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography placeholder='' variant="small" color="blue-gray" className="font-normal">
                      {counter}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder=""
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
      <Button placeholder='' onClick={() => setModal(true)} color="indigo" className="mt-5">
        Добавить
      </Button>
    </motion.div>
  );
};

export default LinksList;
