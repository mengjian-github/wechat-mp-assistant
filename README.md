# 微信公众号智能编辑助手

<div align="center">
  <h3>🚀 让公众号创作更智能、更高效</h3>
  <p>一个强大的 Chrome 插件，集成 AI 写作、素材管理、一键排版等功能</p>
</div>

## ✨ 核心功能

### 🤖 AI 智能写作
- **对话式创作**：通过自然语言对话，让 AI 理解你的创作需求
- **链接解析**：支持解析第三方链接，获取参考内容
- **多模型支持**：可切换 Claude、GPT 等多种 AI 模型

### 📚 素材库管理
- **分类管理**：参考范文、金句、故事等多维度分类
- **快速检索**：智能搜索，快速找到需要的素材
- **一键引用**：写作时可随时调用素材库内容

### 🎨 主题排版系统
- **预设主题**：科技风、商务风、文艺风等多种主题
- **原子组件**：标题、引用、卡片等组件自由组合
- **实时预览**：编辑同时预览最终效果

### 🔧 Chrome 插件特性
- **侧边栏展示**：不影响公众号编辑器使用
- **深度集成**：与微信公众号编辑器无缝对接
- **快捷键支持**：提升操作效率

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **UI 组件**：Ant Design + TailwindCSS
- **状态管理**：Zustand
- **Chrome API**：Manifest V3
- **AI 集成**：OpenAI API / Claude API
- **构建工具**：Vite + CRXJS

## 📦 安装使用

### 开发环境

```bash
# 克隆项目
git clone https://github.com/mengjian-github/wechat-mp-assistant.git
cd wechat-mp-assistant

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建插件
npm run build
```

### 安装插件

1. 打开 Chrome 扩展管理页面 `chrome://extensions/`
2. 开启「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择项目的 `dist` 目录

## 📱 联系作者

如有问题或建议，欢迎通过以下方式联系：

- GitHub Issues
- 邮箱：[你的邮箱]

## 📄 开源协议

MIT License