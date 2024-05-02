import React, { useEffect, useState } from 'react';
import { Space, Button, Rate } from 'antd';
import ImageGroup from '@/pages/eval/components/ImageGroup';
import { imageDemo, videoDemo, rateDesc, cookieMap, imgaeCriterions, videoCriterions } from '@/pages/eval/js/Reader';

import '@/pages/index.scss';

const setStateList = (images, setFunc, group_id: number, groupState) => {
    const tmp = JSON.parse(JSON.stringify(images));
    tmp[group_id].data = groupState;
    setFunc(tmp);
};

const RateCriterion: React.FC = () => {
    // const tooltip = rateDesc.map((row) => row.desp);
    return (
        <div className=''>
            <div className='ele'>
                <div className='center ele text-main'>
                Use the five-star rating system described as follows to evaluate.
                </div>
            </div>
            <div className='ele'>
            <table border="1" className='table'>
                <thead>
                    <tr className=''>
                        <th align="center" width="200px">
                            <div className='pad'>
                            Score
                            </div>
                        </th>
                        <th width="200px">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rateDesc.map((row, index) => (
                        <tr key={index}>
                            <td align='center'>
                                <div className=''><Rate value={row.score} disabled={true}/></div>
                                </td>
                            <td align='center'>
                            <div className=''>{row.desp}</div>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>  
        </div>
    );
}

const ImageRateCriterion: React.FC = () => {
    const [images, setImages] = useState([{ id: 0, data: imageDemo }]);
    return (
        <div className=''>
            <div className="text-main center">
            For image restoration results, evaluate the performance of different methods from two criterions,&nbsp;
            <b className='light'>{imgaeCriterions[0].name}</b>
            &nbsp;and&nbsp;
              <b className='light'>{imgaeCriterions[1].name}</b>
            .
          </div>
          <div className='center pad-sub'>
            <table border="1" className='table'>
                <thead>
                    <tr align='center'>
                        <th align='center' width="100px">Criterion</th>
                        <th align='center' width="300px">
                            <div className='light pad'>{imgaeCriterions[0].name}</div>
                        </th>
                        <th align='center' width="300px">
                            <div className='light pad'>{imgaeCriterions[1].name}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td align='left'>
                        <div className='pad'>{imgaeCriterions[0].desp}</div>
                        </td>
                        <td align='left'><div className='pad'>{imgaeCriterions[1].desp}</div></td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div className='center text-main'>
            As shown in the following images, the 1st row presents the original low-quality image and the high-quality restoration results from different methods.
          </div>
          <div className='center text-main'>
            You need to use the five-point rating system to evaluate the&nbsp;
            <b className='light'>{cookieMap.image.desp[0]}</b>
            &nbsp;of restoration results for the 1st row.
          </div>
          <div className='center text-main'>
            The 2nd row gives a copy of the 1st row for evaluation in a different criterion, i.e. the&nbsp;
            <b className='light'>{cookieMap.image.desp[1]}</b>.
          </div>
          <div className='center pad'>
            {images.map((item, index) => (
              <div>
                <ImageGroup
                data={item.data}
                group_id={item.id}
                key={index}
                desp={cookieMap.image.desp}
                tooltip={true}
                setStateList={(group_id: number, groupState) =>
                  setStateList(images, setImages, group_id, groupState)
                }
              />
              </div>
            ))}
          </div>
        </div>
    );
}

const VideoRateCriterion: React.FC = () => {
    const [videos, setVideos] = useState([{ id: 0, data: videoDemo }]);
    return (
        <div className=''>
            <div className='ele text-main center'>
              For evaluation of restored videos, the evaluation rules are similar to the image one.
            </div>
            <div className='ele text-main center'>
              The only difference is that criterions are now changed to&nbsp;
              <span className='light'><b>{videoCriterions[0].name}</b></span>
              &nbsp;and&nbsp;
              <span className='light'>
              <b>{videoCriterions[1].name}</b>.
              </span>
            </div>
            {/* table */}
            <div className='pad-sub'>
                <table border="1" className='table'>
                    <thead>
                        <tr>
                            <th align='center' width="100px">
                                <div className='pad'>Criterion</div>
                            </th>
                            <th align='center' width="300px">
                                <div className='light'>{videoCriterions[0].name}</div>
                            </th>
                            <th align='center' width="300px">
                                <div className='light'>{videoCriterions[1].name}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Description</th>
                            <td align='left'><div className='pad'>{videoCriterions[0].desp}</div></td>
                            <td align='left'><div className='pad'>{videoCriterions[1].desp}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='center pad'>
            {videos.map((item, index) => (
              <ImageGroup
                data={item.data}
                group_id={item.id}
                key={index}
                desp={cookieMap.video.desp}
                tooltip={true}
                setStateList={(group_id: number, groupState) =>
                  setStateList(videos, setVideos, group_id, groupState)
                }
              />
            ))}
            </div>
        </div>
    );
}

export {RateCriterion, ImageRateCriterion, VideoRateCriterion};