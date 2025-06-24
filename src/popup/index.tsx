import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, Button, Space, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import {
  EditOutlined,
  FolderOutlined,
  SettingOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import './index.css';
import 'antd/dist/reset.css';

const Popup: React.FC = () => {
  const handleOpenSidebar = async () => {
    // 获取当前标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.id) {
      message.error('无法获取当前标签页');
      return;
    }

    // 检查是否在公众号编辑器页面
    if (!tab.url?.includes('mp.weixin.qq.com')) {
      message.warning('请在微信公众号编辑器页面使用');
      return;
    }

    // 发送消息打开侧边栏
    chrome.tabs.sendMessage(tab.id, {
      type: 'TOGGLE_SIDEBAR',
      data: { open: true }
    });

    // 关闭弹出窗口
    window.close();
  };

  const handleOpenOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h3>公众号编辑助手</h3>
        <p>让创作更智能、更高效</p>
      </div>

      <div className="popup-content">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            block
            size="large"
            onClick={handleOpenSidebar}
          >
            打开编辑助手
          </Button>

          <Button
            icon={<FolderOutlined />}
            block
            onClick={() => {
              handleOpenSidebar();
              // TODO: 切换到素材库标签
            }}
          >
            素材库
          </Button>

          <Button
            icon={<SettingOutlined />}
            block
            onClick={handleOpenOptions}
          >
            设置
          </Button>
        </Space>
      </div>

      <div className="popup-footer">
        <a href="https://github.com/mengjian-github/wechat-mp-assistant" target="_blank">
          <QuestionCircleOutlined /> 帮助文档
        </a>
      </div>
    </div>
  );
};

// 渲染应用
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ConfigProvider locale={zhCN}>
    <Popup />
  </ConfigProvider>
);
