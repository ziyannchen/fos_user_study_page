import React from 'react';

import FileSaver from 'file-saver';

const saveFileLocal = (data, filename: string) => {
  const tmp_data = JSON.parse(JSON.stringify(data));
  for (let group_id = 0; group_id < data.length; group_id++) {
    const item = data[group_id].data;
    for (let image_id = 0; image_id < item.length; image_id++) {
      const url = item[image_id].url.replace(
        'https://pjlab-gvm-data.oss-cn-shanghai.aliyuncs.com/',
        '',
      );
      tmp_data[group_id].data[image_id].url = url;
    }
  }

  let content = JSON.stringify({ results: tmp_data });
  let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

  FileSaver.saveAs(blob, filename);
};

export { saveFileLocal };
