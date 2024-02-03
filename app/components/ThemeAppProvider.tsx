'use client';
import { ReactNode, FC } from 'react';
import { ThemeProvider, Button } from '@material-tailwind/react';

interface IThemeAppProviderProps {
  children: ReactNode;
}
const ThemeAppProvider: FC<IThemeAppProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeAppProvider;
