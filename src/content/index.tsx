import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';
import './index.css';

console.log('微信公众号智能编辑助手 - 内容脚本已加载');

// 创建侧边栏容器
const createSidebarContainer = () => {
  const container = document.createElement('div');
  container.id = 'wechat-mp-assistant-sidebar';
  document.body.appendChild(container);
  return container;
};

// 初始化侧边栏
const initSidebar = () => {
  const container = createSidebarContainer();
  const root = ReactDOM.createRoot(container);
  root.render(<Sidebar />);
};

// 等待页面加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TOGGLE_SIDEBAR') {
    const sidebar = document.getElementById('wechat-mp-assistant-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open', request.data.open);
    }
  }
});

// 添加快捷键支持
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + E 打开/关闭侧边栏
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
    e.preventDefault();
    const sidebar = document.getElementById('wechat-mp-assistant-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  }
});
