import { message } from 'antd';

// const [messageApi, contextHolder] = message.useMessage();

const callMessage = (content: string, type: string = 'success', messageApi) => {
  messageApi.open({
    type: type,
    content: content,
  });
};

export { callMessage };
