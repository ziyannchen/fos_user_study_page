import React, { useEffect, useState } from 'react';

import FosBoard from './components/Board';
import FosLogin from './components/Login';

import '@/pages/index.scss';
import { useCookies } from 'react-cookie';

interface IProps {}

const Fos: React.FC<IProps> = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['FosUser', 'FosLogin']);
  // removeCookie('FosUser');
  // removeCookie('FosLogin');
  return (
    <div className='fos w-full h-full'>{cookie.FosLogin ? <FosBoard user={cookie.FosUser} /> : <FosLogin />}</div>
  );
};
export default Fos;
