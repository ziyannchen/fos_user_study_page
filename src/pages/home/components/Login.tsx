import React, { useState } from 'react';
import { Input, Button, Space, message, notification } from 'antd';
import { useCookies } from 'react-cookie';
import { history } from 'umi';

import { callMessage } from '../js/message';

import '@/pages/index.scss';
import allUser from '../js/user.json'
import Teaser from '@/assets/images/fos/fos_v_samples.gif';

interface IProps {}

const { Search } = Input;

// @ts-ignore
const FosLogin: React.FC<IProps> = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['FosUser', 'FosLogin']);
  // alert(cookie.FosLogin);
  // console.log('Username: ', cookie.FosUser);
  // const allUser = require('../js/user.json');
  const [messageApi, contextHolder] = message.useMessage();

  const checkUser = (username: string) => {
    // console.log('input', username);
    for (let key in allUser) {
      // console.log(allUser[key], username);
      if (username == allUser[key]) return key;
    }
    return null;
  };

  const handleLogin = (username: string) => {
    
    if (username == '') {
      callMessage('Please input username', 'info', messageApi);
      return;
    }
    const user_id = checkUser(username);
    // console.log('input', username, user_id);
    if (user_id == null) {
      callMessage('User not exist', 'error', messageApi);
      return;
    }
    setCookie('FosUser', { id: user_id, username: username });
    setCookie('FosLogin', true);
    history.push('/home');
  };

  return (
    <div className="fos pad">
      {contextHolder}
      <div className="banner pad center">
        <span className="light">FOS</span>&nbsp; Face In the Wild.
      </div>
      <div>
      <div className='text-sub center'>
        Welcome to the user study page of the FOS Face.
      </div>
      <div className='center'>
          <Search
            className="pad-sub"
            style={{ width: '500px' }}
            type="text"
            placeholder="Please enter the user id."
            enterButton="Enter"
            size="large"
            allowClear
            // onChange={(e) => }
            onSearch={(e) => {
              // console.log(e);
              handleLogin(e);
            }}
          />
        </div>
        <div className="text-sub">
          <div className='center pad-sub pad-top'>
          FOS face is a benchmark test dataset with faces in the wild for blind face restoration.
          </div>
          {/* <div className='center'>
          The volunteers are invited to ranking performace of the baselines as user studies in our
          BFR benchmark.
          </div> */}
          <div className='pad-sub center c-active c-r' >
            <img className="center" src={Teaser} alt="FOS-V samples" style={{width: '90%'}} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FosLogin;
