import React, { useEffect }  from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { history } from 'umi';
import { useCookies } from 'react-cookie';
import { Modal, Result, Button, Row, Col, message, Progress, Pagination, notification } from 'antd';

import { persistentStorage, clearAll } from './js/State';
import type { ImageType, ImageGroupType } from '@/pages/eval/js/Reader';
import { saveFileLocal } from './js/Local';
import {cookieMap, PageSize} from '@/pages/eval/js/Reader';
import ImageGroup from '@/pages/eval/components/ImageGroup';
import initialState from '@@/plugin-initial-state/models/initialState';

import '@/pages/index.scss';

interface IProps {
  test: boolean;
}

const EvalBoard: React.FC<IProps> = ({test = true}) => {
  const VideoJsonFile = require(`${test ? cookieMap.video.json_test : cookieMap.video.json}`);
  const ImageJsonFile = require(`${test ? cookieMap.image.json_test : cookieMap.image.json}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([
    'FosIsDemo',
    'FosUser',
    'IsFosFinished',
    'TestState',
    'FosLogin'
  ]);
  console.log('login',cookie.FosLogin? 'true': 'false');
  // clearAll();
  const [finished, setFinished] = useState(false);
  console.log(cookie.TestState, cookieMap.video);

  let state = null;
  let data = null;

  // by default: image board
  state = cookieMap.image;
  data = ImageJsonFile;
  if (cookie.TestState == 'video') {
    state = cookieMap.video;
    data = VideoJsonFile;
    // console.log('Video data loaded', data);
  }

  const localStoreGroupID = persistentStorage.getItem(state.group_id);
  const localStoreResults = persistentStorage.getItem(state.result);
  const total = data.length;
  // persistentStorage.setItem('allResults', null);
  const [allResults, setResults] = useState(localStoreResults ? localStoreResults : data);
  const [curGroupID, setCurGroupID] = useState(localStoreGroupID ? localStoreGroupID : 1);
  const [messageApi, contextHolder] = message.useMessage();

  const checkUnfinished = () => {
    let unfinished_tmp = [];
    for (let i = 0; i < total; i++) {
      const tmp = allResults[i].data;
      // console.log(tmp);
      for (let j = 1; j < tmp.length; j++) {
        // console.log(tmp[j]);
        if (parseInt(tmp[j].score1) && parseInt(tmp[j].score2)) continue;
        unfinished_tmp.push(i + 1);
        break;
      }
    }
    return unfinished_tmp;
  };

  const [unfinished, setUnfinished] = useState(checkUnfinished);

  const setStateList = (group_id: string, groupState) => {
    const tmp = JSON.parse(JSON.stringify(allResults));
    tmp[parseInt(group_id)].data = groupState;
    setResults(tmp);
  };

  const callMessage = (content: string, type: string = 'success') => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const onSaveResults = (message: boolean = true, save_file: boolean = true) => {
    persistentStorage.setItem(state.result, allResults);
    persistentStorage.setItem(state.group_id, curGroupID);
    setUnfinished(checkUnfinished);
    if (save_file)
      saveFileLocal(allResults, cookie.TestState + '_' + cookie.FosUser.username + '_tmp.json');
    if (message) callMessage('Save Succeed');
  };

  const onPaginationChange = (page: number) => {
    setCurGroupID(page);
    onSaveResults(false, false);
    // console.log('onPaginationChange', data[page]);
    // window.scrollTo(0, 20);
  };

  const [api, contextHolderNot] = notification.useNotification();
  const openNotification = (unfinished_tmp) => {
    const key = `open${Date.now()}`;
    api.open({
      message: 'Notification Title',
      description:
        'Page ' +
        unfinished_tmp.toString() +
        ' (' +
        unfinished_tmp.length.toString() +
        ' pages in total) are still not finished',
      key,
    });
    setCurGroupID(unfinished_tmp[0]);
  };

  const onSubmit = () => {
    const unfinished_tmp = checkUnfinished();
    setUnfinished(unfinished_tmp.length);
    onSaveResults(false, false);
    if (unfinished_tmp.length != 0) {
      openNotification(unfinished_tmp);
      callMessage('Submission Failed', 'error');
    } else {
      setIsModalOpen(true);
    }
  };

  const onSubmitConfirm = () => {
    callMessage('Submission Succeed');
    setCookie(state.finish, true);
    setFinished(true);
    saveFileLocal(allResults, cookie.TestState + '_' + cookie.FosUser.username + '_final.json');
  };

  const goConsole = () => {
    setFinished(true);
    setCookie('FosIsDemo', true);
    window.location.reload();
  };

  const getFinishPercetage = () => {
    if (unfinished == null) return ((total - curGroupID) / total) * 100;
    return ((total - unfinished.length) / total) * 100;
  };

  const navigate = useHistory();

  useEffect(() => {
    const isLoggedIn = cookie.FosLogin ? true : false;

    if (!isLoggedIn) {
      Modal.warning({
        title: 'Authentification needed',
        content: 'Please login first.',
        onOk() {
          navigate.push('/login');
        }
      });
    }
  }, [navigate]);

  return (
    console.log('login',cookie.FosLogin? 'true': 'false'),
    cookie.FosLogin ? 
    <div className="fos">
      {finished ? (
        <Result
          status="success"
          title="Success!"
          subTitle={
            '(User ID: ' +
            cookie.FosUser.username +
            '\n) You have submitted an ' +
            cookie.TestState +
            ' evaluation successfully. Thanks for your efforts!'
          }
          extra={[
            <Button type="primary" key="console" onClick={goConsole}>
              Go Console
            </Button>,
          ]}
        />
      ) : (
        <div className="display-flex center">
          <div>
            <Modal
              title="Confirm"
              open={isModalOpen}
              onOk={onSubmitConfirm}
              onCancel={() => setIsModalOpen(false)}
            >
              <p>You've finished all the evaluation, please confirm your submission</p>
            </Modal>
            {/* progress bar */}
            <Row className="center" style={{ height: '80px', margin: '0 0 0 5%' }}>
              <Col span={1} style={{ margin: '0 30px 0 0px' }}>
                <Button onClick={onSaveResults}>Save</Button>
              </Col>
              <Col span={15}>
                {contextHolder}
                {contextHolderNot}
                <Progress
                  format={(percent: number) =>
                    percent == 100 ? 'Done!' : String(percent.toFixed(2)) + '%'
                  }
                  percent={getFinishPercetage()}
                  status="active"
                  strokeColor={{ from: '#108ee9', to: '#87d068' }}
                />
              </Col>
              <Col span={2} className="center" style={{ margin: '0 0 0px 30px' }}>
                <Button onClick={onSubmit}>Submit</Button>
              </Col>
            </Row>
            {/* media group panel */}
            <Row >
              <div style={{ width: '100%'}}>
                <ImageGroup
                  className={'display-flex flex-justify-content-space-around'}
                  data={allResults[curGroupID - 1].data}
                  group_id={allResults[curGroupID - 1].id}
                  setStateList={setStateList}
                  desp={state.desp}
                />
              </div>
            </Row>
            {/* Pagination */}
            <Row className="center" style={{ height: '60px', margin: '0 0 5% 0'}}>
              <div>
                <Pagination
                  className={'display-flex flex-justify-content-space-around'}
                  style={{}}
                  simple
                  total={total}
                  pageSize={PageSize}
                  current={curGroupID}
                  defaultCurrent={curGroupID}
                  onChange={onPaginationChange}
                  showSizeChanger
                  showQuickJumper
                />
              </div>
            </Row>
          </div>
        </div>
      )}
    </div> : null
  );
};

export default EvalBoard;
