// Chrome 扩展后台服务脚本
console.log('微信公众号智能编辑助手 - 后台服务已启动');

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装');

  // 设置默认配置
  chrome.storage.local.set({
    settings: {
      aiModel: 'claude',
      theme: 'default',
      autoSave: true,
    }
  });
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息：', request);

  switch (request.type) {
    case 'OPEN_SIDEBAR':
      // 打开侧边栏
      chrome.tabs.sendMessage(sender.tab!.id!, {
        type: 'TOGGLE_SIDEBAR',
        data: { open: true }
      });
      break;

    case 'FETCH_URL':
      // 代理获取外部链接内容
      fetch(request.url)
        .then(response => response.text())
        .then(html => {
          sendResponse({ success: true, data: html });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // 表示异步响应

    case 'AI_COMPLETE':
      // 处理 AI 请求（这里需要接入实际的 AI API）
      handleAIRequest(request.data)
        .then(response => {
          sendResponse({ success: true, data: response });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true;
  }
});

// AI 请求处理函数（示例）
async function handleAIRequest(data: any) {
  // TODO: 接入实际的 AI API
  console.log('处理 AI 请求：', data);
  return {
    content: '这是 AI 生成的示例内容...',
    tokens: 100
  };
}

export {};
