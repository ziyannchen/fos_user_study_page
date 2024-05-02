import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

import '@/pages/index.scss';

import { RateCriterion, ImageRateCriterion, VideoRateCriterion } from './components/Criterion';
import UserClaim from './components/Claim';

const Tutorial: React.FC = () => {
    return (
        <div className='fos pad'>
          <div className="light banner center ele pad-top">
              Tutorial
          </div>
          <div>
              <div className="">
                  <div className='text-main ele center'>
                    Face restoration is a task to restore a low-resolution face image or video clip to a high-quality one.
                  </div>
                  <div className='text-main ele center'>
                    The purpose of user study is to subjectively evaluate the restoration performance of certain dace restoration methods.
                  </div>
              </div>
              <div className='title center ele'>
              Evaluation Criterion
              </div>
              <RateCriterion />
          </div>

          {/* Demo */}
          <div className='title center ele'>
            Demo
          </div>
          <div className='subtitle ele center'>
              Image
          </div>
            <ImageRateCriterion />
          <div>
            <div className='subtitle ele center'>
                Video
            </div>
            <VideoRateCriterion />
          </div>

          {/*  */}
          <div className='title center pad'>
            About Privacy
          </div>
          <UserClaim />
          <div className='center pad'>
            <Button onClick={()=>history.push('/eval')}> I understand! start evaluation</Button>
          </div>
        </div>
    )
}
export default Tutorial;