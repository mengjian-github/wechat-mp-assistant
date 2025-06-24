import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Switch, Button, message, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;

interface Settings {
  aiModel: string;
  apiKey: string;
  autoSave: boolean;
  shortcutKey: string;
  autoApplyTheme: boolean;
}

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await chrome.storage.local.get('settings');
      if (result.settings) {
        form.setFieldsValue(result.settings);
      }
    } catch (error) {
      console.error('加载设置失败：', error);
    }
  };

  const handleSave = async (values: Settings) => {
    setLoading(true);
    try {
      await chrome.storage.local.set({ settings: values });
      message.success('设置已保存');
    } catch (error) {
      message.error('保存失败');
      console.error('保存设置失败：', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          aiModel: 'claude',
          autoSave: true,
          shortcutKey: 'Ctrl+Shift+E',
          autoApplyTheme: false,
        }}
      >
        <h4>AI 设置</h4>
        <Form.Item
          name="aiModel"
          label="AI 模型"
          extra="选择要使用的 AI 模型"
        >
          <Select>
            <Option value="claude">Claude 3.5</Option>
            <Option value="gpt4">GPT-4</Option>
            <Option value="gpt3.5">GPT-3.5</Option>
            <Option value="custom">自定义模型</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="apiKey"
          label="API Key"
          extra="输入对应 AI 服务的 API Key"
          rules={[{ required: true, message: '请输入 API Key' }]}
        >
          <Input.Password placeholder="sk-..." />
        </Form.Item>

        <Divider />

        <h4>编辑器设置</h4>
        <Form.Item
          name="autoSave"
          label="自动保存"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="autoApplyTheme"
          label="自动应用主题"
          valuePropName="checked"
          extra="生成内容后自动应用选中的主题"
        >
          <Switch />
        </Form.Item>

        <Divider />

        <h4>快捷键设置</h4>
        <Form.Item
          name="shortcutKey"
          label="打开/关闭侧边栏"
          extra="设置打开关闭侧边栏的快捷键"
        >
          <Input placeholder="Ctrl+Shift+E" disabled />
        </Form.Item>

        <Divider />

        <h4>数据管理</h4>
        <div className="data-actions">
          <Button onClick={() => exportData()}>
            导出数据
          </Button>
          <Button onClick={() => importData()}>
            导入数据
          </Button>
          <Button danger onClick={() => clearData()}>
            清空数据
          </Button>
        </div>

        <Form.Item className="submit-button">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            block
          >
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// 导出数据
async function exportData() {
  try {
    const data = await chrome.storage.local.get(null);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wechat-mp-assistant-backup-${new Date().getTime()}.json`;
    a.click();
    message.success('数据已导出');
  } catch (error) {
    message.error('导出失败');
    console.error(error);
  }
}

// 导入数据
async function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await chrome.storage.local.set(data);
      message.success('数据已导入');
      window.location.reload();
    } catch (error) {
      message.error('导入失败，请检查文件格式');
      console.error(error);
    }
  };
  input.click();
}

// 清空数据
async function clearData() {
  if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
    try {
      await chrome.storage.local.clear();
      message.success('数据已清空');
      window.location.reload();
    } catch (error) {
      message.error('清空失败');
      console.error(error);
    }
  }
}

export default Settings;
