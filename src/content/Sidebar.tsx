import React, { useState } from 'react';
import { Tabs, Input, Button, message } from 'antd';
import {
  MessageOutlined,
  FolderOutlined,
  BgColorsOutlined,
  SettingOutlined,
  CloseOutlined
} from '@ant-design/icons';
import AIChat from '../components/AIChat';
import MaterialLibrary from '../components/MaterialLibrary';
import ThemeSelector from '../components/ThemeSelector';
import Settings from '../components/Settings';
import './Sidebar.css';

const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const handleClose = () => {
    const sidebar = document.getElementById('wechat-mp-assistant-sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  };

  return (
    <div className="wmp-sidebar">
      <div className="wmp-sidebar-header">
        <h3>公众号编辑助手</h3>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
          className="wmp-close-btn"
        />
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="wmp-sidebar-tabs"
      >
        <TabPane
          tab={<><MessageOutlined /> AI写作</>}
          key="chat"
        >
          <AIChat />
        </TabPane>

        <TabPane
          tab={<><FolderOutlined /> 素材库</>}
          key="materials"
        >
          <MaterialLibrary />
        </TabPane>

        <TabPane
          tab={<><BgColorsOutlined /> 主题</>}
          key="themes"
        >
          <ThemeSelector />
        </TabPane>

        <TabPane
          tab={<><SettingOutlined /> 设置</>}
          key="settings"
        >
          <Settings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Sidebar;
