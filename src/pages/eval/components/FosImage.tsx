import React, { useState } from 'react';
import { Player } from 'video-react';
import { Image, Button, Rate, Space, Modal } from 'antd';

import { WidthI, WidthV } from '../js/Reader';
import type { ImageType } from '../js/Reader';
import ReactPlayer from 'react-player';

interface IProps {
  data: ImageType;
  onRate: Function;
  score: number;
  desp?: string;
  width?: number;
}

const FosImage: React.FC<IProps> = ({ data, score, onRate, desp, width }) => {
  // const [rate, setRate] = useState(data.score);
  return (
    <div className="ele" style={{ margin: '10px 0 10px 0' }}>
      <div className={'fos_image'}>
        {/*{console.log(data.url)}*/}
        {data?.url.endsWith('.png') || data?.url.endsWith('.jpg') ? (
          <Image
            src={data?.url}
            alt=""
            width={width ? width : WidthI}
            height={width ? width : WidthI}
            preview={data?.score1 != '-2'}
          />
        ) : (
          <ReactPlayer
            url={data?.url}
            playing={true}
            autoPlay
            loop
            width={width ? width : WidthV}
            height={width ? width : WidthV}
            controls
          />
        )}

        <span className="center">
          {parseInt(data.id) ? (
            <Space>
              <Rate
                onChange={(s) => {
                  // setRate(s);
                  onRate(parseInt(data.id), s);
                }}
                value={score}
              />
            </Space>
          ) : (
            <div className="center" style={{ height: '31px'}}>
              {desp}
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
export default FosImage;
