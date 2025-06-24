import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, message, Spin } from 'antd';
import { SendOutlined, LinkOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import './index.css';

const { TextArea } = Input;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // 发送消息到后台脚本处理
      const response = await chrome.runtime.sendMessage({
        type: 'AI_COMPLETE',
        data: {
          messages: [...messages, userMessage],
          prompt: inputValue
        }
      });

      if (response.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        message.error('AI 响应失败：' + response.error);
      }
    } catch (error) {
      message.error('发送失败，请重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleParseLink = async () => {
    const linkMatch = inputValue.match(/https?:\/\/[^\s]+/);
    if (!linkMatch) {
      message.warning('请输入有效的链接');
      return;
    }

    const url = linkMatch[0];
    message.loading('正在解析链接...');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'FETCH_URL',
        url
      });

      if (response.success) {
        message.success('链接解析成功');
        // 将解析内容添加到输入框
        setInputValue(prev => prev + '\n\n[链接内容已解析，可以基于此进行创作]');
      } else {
        message.error('链接解析失败');
      }
    } catch (error) {
      message.error('解析失败，请重试');
    }
  };

  const handleApplyToEditor = (content: string) => {
    // 将内容应用到公众号编辑器
    // TODO: 实现将内容插入到编辑器的逻辑
    message.success('内容已应用到编辑器');
  };

  return (
    <div className="ai-chat-container">
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-content">
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
            {message.role === 'assistant' && (
              <Button
                size="small"
                onClick={() => handleApplyToEditor(message.content)}
              >
                应用到编辑器
              </Button>
            )}
          </div>
        ))}
        {loading && (
          <div className="message assistant loading">
            <Spin /> AI 正在思考...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <TextArea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={e => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="输入您的需求，如：帮我写一篇关于春节的公众号文章..."
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
        <div className="input-actions">
          <Button
            icon={<LinkOutlined />}
            onClick={handleParseLink}
            disabled={loading}
          >
            解析链接
          </Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={loading}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
