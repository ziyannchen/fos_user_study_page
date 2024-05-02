import React from 'react';

import FosImage from './FosImage';
import { WidthI, WidthV } from '../js/Reader';

import EmptyImage from '@/assets/images/xpixel/placeholder.png';
import type { ImageType } from '@/pages/eval/js/Reader';

import '@/pages/index.scss';

interface IProps {
  group_id: number;
  data: ImageType[];
  setStateList: Function;
  desp: string[];
  tooltip?: boolean;
}

const ImageGroup: React.FC<IProps> = ({ data, group_id, setStateList, desp, tooltip = false}) => {
  const onRate = (row, id: number, score: number) => {
    // console.log('ImageGroup onRate ', 'group', group_id, 'image', id, 'score', score);
    const tmp = JSON.parse(JSON.stringify(data));
    if (row == 1) tmp[id].score1 = score;
    else if (row == 2) tmp[id].score2 = score;
    setStateList(group_id, tmp);
  };

  const refEmpty = {
    id: '0',
    score1: '-2',
    score2: '-2',
    url: EmptyImage,
  };

  // @ts-ignore
  return (
    <div className="ele card-wrap display-flex flex-justify-content-space-around">
      <div className=" display-flex flex-justify-content-space-around">
        <div
          className="center text-sub"
          style={{ width: '30px', margin: '0 20px 0 10px', fontWeight: 'bolder' }}
        >
          {parseInt(group_id) + 1}
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index}>
          {/* first row */}
          {tooltip? 
          <div className='center ele gray'>{item.id == '0' ? 'Low-quality Input': 'Restoration Method '+item.id}</div>
          : null}
          <FosImage
            data={item}
            key={index}
            onRate={(id: number, score: number) => onRate(1, id, score)}
            score={parseInt(item.score1)}
            desp={desp[0]}
            width={item.id == '0' && item.url.endsWith('.mp4') ? WidthV : null}
          />
          {/* second row */}
          <FosImage
            data={item.id == '0' ? refEmpty : item}
            key={data.length + index}
            score={parseInt(item.score2)}
            onRate={(id: number, score: number) => onRate(2, id, score)}
            desp={desp[1]}
            width={item.id == '0' && item.url.endsWith('.mp4') ? WidthV : null}
          />
        </div>
      ))}
    </div>
  );
};
export default ImageGroup;
