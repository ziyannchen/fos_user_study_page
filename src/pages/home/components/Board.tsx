import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useCookies } from 'react-cookie';
import { history } from 'umi';

import '@/pages/index.scss';
import EvalBoard from '@/pages/eval/index';

interface IProps {
  user: string;
}

const FosBoard: React.FC<IProps> = ({ user }) => {
  const [cookie, setCookie, removeCookie] = useCookies([
    'FosIsDemo',
    'IsFosFinished',
    'TestState',
    'IsFos_VFinished',
  ]);
  // clearAll();
  // console.log(cookie.IsFosFinished);
  const [isDemo, setIsDemo] = useState(cookie.FosIsDemo != null ? cookie.FosIsDemo : true);
  
  useEffect(() => {
    if (!isDemo) {
      // 显示模态框提示用户
      history.push('/login');
    }
  }, [history]);

  return (
      isDemo ? 
        <div className="pad" style={{}}>
          <div className="banner center">
            <span className="light">FOS Face</span>&nbsp; user study
          </div>
          <div className="text-main">
            <div className='ele center'>
              Hi, thanks for joining the user study of FOS Face restoration benchmark.
            </div>
            <div className='ele center'>
            You are the&nbsp;
              <span className={'light'}>
                <b>{user.id}</b>th
              </span>
              &nbsp;volunteer.
            </div>
            <div className='center text-main'>
              Please refer this&nbsp;
              <p className="c-r" onClick={() => {}}><span className={'light'}><b>Tutorial</b></span></p>
              &nbsp;to learn the evaluation rules.
            </div>
            <div className='center text-main'>
            If you are already familiar with the rules, click the button below to start the evaluation.
            </div>
            <div>
              <div className='center'>
              <Button
                className="ele c-r"
                disabled={cookie.IsFosFinished}
                onClick={() => {
                  setCookie('TestState', 'image');
                  // setIsDemo(false);
                  // setCookie('FosIsDemo', false);
                  history.push('/eval');
                }}
              >
                Image Evaluation
              </Button>
              </div>
              <div className='center'>
                <Button
                className="ele c-r"
                disabled={cookie.IsFos_VFinished}
                onClick={() => {
                  setCookie('TestState', 'video');
                  // setIsDemo(false);
                  // setCookie('FosIsDemo', false);
                  history.push('/eval');
                }}
              >
                Video Evaluation
              </Button>
              </div>
            </div>

          </div>
        </div>
      : null
  );
};
export default FosBoard;
