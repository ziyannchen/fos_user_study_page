// import FosPairs from './fos_aligned_pairs'
import { useState } from 'react';

const PageSize = 1;
const WidthI = 240;
const WidthV = 220;
const server_src = 'https://pjlab-gvm-data.oss-cn-shanghai.aliyuncs.com/data/';

const imgaeCriterions = [
  {
    name: 'Quality', 
    desp: 'Quality denotes the degree of realness that you feel about the restored image.'
  },
  {
    name: 'Fidelity', 
    desp: 'Fidelity denotes the degree of similarity between the restored image and the original low-quality image.'
  }
]

const videoCriterions = [
  {
    name: 'Reconstruction', 
    desp: 'Reconstruction denotes the degree of realness that you feel about the restored video, including the quality and the fidelity of each frame.'
  },
  {
    name: 'Stability', 
    desp: 'Stability denotes the degree of non-flickering in the restored video.'
  }
]

const cookieMap = {
  image: {
    json_test: './js/fos_real_aligned_pairs_test.json',
    json: './js/fos_real_aligned_pairs.json',
    finish: 'IsFosFinished',
    result: 'allResults',
    group_id: 'curGroupID',
    // num_group: NumGroup,
    desp: imgaeCriterions.map((item) => item.name),
  },
  video: {
    json_test: './js/fos_v_h264_pairs_test.json',
    json: './js/fos_v_h264_pairs.json',
    finish: 'IsFos_VFinished',
    result: 'allResultsV',
    group_id: 'curGroupID_V',
    // num_group: NumGroupV,
    desp: videoCriterions.map((item) => item.name),
  },
};

// const EmptyImage = 'https://i.ibb.co/WfPpHnd/New-PPTX-01.png';

type ImageType = {
  id: string;
  score1: string;
  score2: string;
  url: string;
};

type ImageGroupType = {
  id: number;
  data: ImageType[];
};

const rateDesc = [
  {score: 1, desp: 'Fail'},
  {score: 2, desp: 'Insufficient'},
  {score: 3, desp:'Acceptable'},
  {score: 4, desp: 'Good'},
  {score: 5, desp: 'Outstanding'},
]

// const imageReader = (image_path?: string) => {};

const imageDemo: ImageType[] = [
  {
    id: '0',
    score1: '-1',
    score2: '-1',
    // url: 'https://i.ibb.co/NK0h51s/lq.png',
    url: server_src + 'fos_aligned/lq/1_0018_00_0000.png',
  },
  {
    id: '1',
    score1: '5',
    score2: '3',
    url: server_src + 'fos_aligned/codeformer/1_0018_00_0000.png',
  },
  {
    id: '2',
    score1: '3',
    score2: '3',
    url: server_src + 'fos_aligned/gfpgan/1_0018_00_0000.png',
  },
  {
    id: '3',
    score1: '2',
    score2: '3',
    url: server_src + 'fos_aligned/vqfr/1_0018_00_0000.png',
  },
  {
    id: '4',
    score1: '3',
    score2: '5',
    url: server_src + 'fos_aligned/restoreformer/1_0018_00_0000.png',
  },
];

const videoDemo: ImageType[] = [
  {
    id: '0',
    score1: '-1',
    score2: '-1',
    url: server_src + 'ytvf_h264/lq/1_0234_02.mp4',
  },
  {
    id: '1',
    score1: '2',
    score2: '2',
    url: server_src + 'ytvf_h264/restoreformer/1_0234_02.mp4',
  },
  {
    id: '2',
    score1: '3',
    score2: '3',
    url: server_src + 'ytvf_h264/gfpgan/1_0234_02.mp4',
  },
  {
    id: '3',
    score1: '4',
    score2: '2',
    url: server_src + 'ytvf_h264/vqfr/1_0234_02.mp4',
  },
  {
    id: '4',
    score1: '4',
    score2: '4',
    url: server_src + 'ytvf_h264/codeformer/1_0234_02.mp4',
  },
  {
    id: '5',
    score1: '2',
    score2: '5',
    url: server_src + 'ytvf_h264/basicvsr/1_0234_02.mp4',
  },
];

// Image id start from 0
const stateEmpty: number[] = [-1, 0, 0, 0, 0, 0];

const initStateList = (total: number) => {
  const l: number[][] = [];
  for (let i = 0; i < total; i++) {
    l.push(stateEmpty);
  }
  return l;
};

export {
  WidthI,
  WidthV,
  PageSize,
  cookieMap,
  imgaeCriterions,
  videoCriterions,
  ImageType,
  ImageGroupType,
  rateDesc,
  imageDemo,
  videoDemo,
  initStateList,
};
