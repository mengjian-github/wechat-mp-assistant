import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { themes, Theme } from '../../themes';
import './index.css';

const ThemeSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [previewContent, setPreviewContent] = useState<string>('');

  useEffect(() => {
    // 加载当前选中的主题
    chrome.storage.local.get('selectedTheme', (result) => {
      if (result.selectedTheme) {
        setSelectedTheme(result.selectedTheme);
      }
    });

    // 设置预览内容
    setPreviewContent(`
# 一级标题

## 二级标题

### 三级标题

这是一段普通的正文内容，用来展示主题的基础文字样式。**这是加粗文本**，*这是斜体文本*。

> 这是一个引用块，通常用来引用名人名言或重要观点。
>
> — 作者

**无序列表：**
- 列表项目一
- 列表项目二
- 列表项目三

**有序列表：**
1. 第一步
2. 第二步
3. 第三步

\`\`\`javascript
// 代码块示例
function hello() {
  console.log('Hello, World!');
}
\`\`\`

[这是一个链接](https://example.com)

---

表格示例：

| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
    `);
  }, []);

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    chrome.storage.local.set({ selectedTheme: themeName });
    message.success('主题已切换');
  };

  const handleApplyTheme = () => {
    // 将主题应用到编辑器
    const theme = themes[selectedTheme];
    const styledContent = applyThemeToContent(previewContent, theme);

    // TODO: 将样式化的内容插入到公众号编辑器
    navigator.clipboard.writeText(styledContent);
    message.success('主题已应用，内容已复制到剪贴板');
  };

  const applyThemeToContent = (content: string, theme: Theme): string => {
    // 这里简化处理，实际应该根据主题生成带样式的 HTML
    return content;
  };

  return (
    <div className="theme-selector-container">
      <div className="theme-list">
        <Radio.Group value={selectedTheme} onChange={e => handleThemeChange(e.target.value)}>
          {Object.entries(themes).map(([key, theme]) => (
            <Card
              key={key}
              className={`theme-card ${selectedTheme === key ? 'selected' : ''}`}
              onClick={() => handleThemeChange(key)}
            >
              <div className="theme-card-header">
                <span className="theme-name">{theme.name}</span>
                {selectedTheme === key && <CheckOutlined className="theme-check" />}
              </div>
              <p className="theme-description">{theme.description}</p>
              <div className="theme-preview" style={{ borderColor: theme.primaryColor }}>
                <div className="preview-header" style={{ color: theme.primaryColor }}>
                  标题预览
                </div>
                <div className="preview-text">正文预览文本...</div>
              </div>
            </Card>
          ))}
        </Radio.Group>
      </div>

      <div className="theme-preview-container">
        <h4>主题预览</h4>
        <div
          className="theme-preview-content"
          dangerouslySetInnerHTML={{
            __html: renderPreviewContent(previewContent, themes[selectedTheme])
          }}
        />
        <Button
          type="primary"
          onClick={handleApplyTheme}
          className="apply-theme-btn"
        >
          应用主题到编辑器
        </Button>
      </div>
    </div>
  );
};

// 渲染预览内容
function renderPreviewContent(content: string, theme: Theme): string {
  // 这里应该根据主题渲染 Markdown 为 HTML
  // 简化处理，实际需要完整的 Markdown 渲染器
  return `<div style="font-family: ${theme.base.fontFamily}; color: ${theme.base.color}">
    ${content.replace(/\n/g, '<br>')}
  </div>`;
}

export default ThemeSelector;
