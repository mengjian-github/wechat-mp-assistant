import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Card,
  Tag,
  Modal,
  Form,
  Select,
  message,
  Empty,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined
} from '@ant-design/icons';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

interface Material {
  id: string;
  title: string;
  content: string;
  category: 'reference' | 'quote' | 'story' | 'other';
  tags: string[];
  createTime: Date;
  updateTime: Date;
}

const categoryMap = {
  reference: { name: '参考范文', color: 'blue' },
  quote: { name: '金句', color: 'gold' },
  story: { name: '故事', color: 'green' },
  other: { name: '其他', color: 'default' }
};

const MaterialLibrary: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [form] = Form.useForm();

  // 从 Chrome 存储加载素材
  useEffect(() => {
    loadMaterials();
  }, []);

  // 过滤素材
  useEffect(() => {
    filterMaterials();
  }, [materials, searchText, selectedCategory]);

  const loadMaterials = async () => {
    try {
      const result = await chrome.storage.local.get('materials');
      if (result.materials) {
        setMaterials(result.materials);
      }
    } catch (error) {
      console.error('加载素材失败：', error);
    }
  };

  const saveMaterials = async (newMaterials: Material[]) => {
    try {
      await chrome.storage.local.set({ materials: newMaterials });
      setMaterials(newMaterials);
    } catch (error) {
      message.error('保存失败');
      console.error('保存素材失败：', error);
    }
  };

  const filterMaterials = () => {
    let filtered = materials;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter(m =>
        m.title.includes(searchText) ||
        m.content.includes(searchText) ||
        m.tags.some(tag => tag.includes(searchText))
      );
    }

    setFilteredMaterials(filtered);
  };

  const handleAdd = () => {
    setEditingMaterial(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    form.setFieldsValue({
      ...material,
      tags: material.tags.join(', ')
    });
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const newMaterials = materials.filter(m => m.id !== id);
    saveMaterials(newMaterials);
    message.success('删除成功');
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    message.success('已复制到剪贴板');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const now = new Date();
      const material: Material = {
        id: editingMaterial?.id || Date.now().toString(),
        title: values.title,
        content: values.content,
        category: values.category,
        tags: values.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        createTime: editingMaterial?.createTime || now,
        updateTime: now
      };

      let newMaterials;
      if (editingMaterial) {
        newMaterials = materials.map(m => m.id === material.id ? material : m);
      } else {
        newMaterials = [...materials, material];
      }

      saveMaterials(newMaterials);
      setModalVisible(false);
      message.success(editingMaterial ? '编辑成功' : '添加成功');
    });
  };

  return (
    <div className="material-library-container">
      <div className="material-header">
        <Input
          placeholder="搜索素材..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 120 }}
        >
          <Option value="all">全部分类</Option>
          {Object.entries(categoryMap).map(([key, value]) => (
            <Option key={key} value={key}>{value.name}</Option>
          ))}
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加素材
        </Button>
      </div>

      <div className="material-list">
        {filteredMaterials.length === 0 ? (
          <Empty description="暂无素材" />
        ) : (
          filteredMaterials.map(material => (
            <Card
              key={material.id}
              className="material-card"
              size="small"
              title={
                <div className="material-card-title">
                  <span>{material.title}</span>
                  <Tag color={categoryMap[material.category].color}>
                    {categoryMap[material.category].name}
                  </Tag>
                </div>
              }
              actions={[
                <CopyOutlined key="copy" onClick={() => handleCopy(material.content)} />,
                <EditOutlined key="edit" onClick={() => handleEdit(material)} />,
                <Popconfirm
                  key="delete"
                  title="确定删除这个素材吗？"
                  onConfirm={() => handleDelete(material.id)}
                >
                  <DeleteOutlined />
                </Popconfirm>
              ]}
            >
              <p className="material-content">{material.content}</p>
              {material.tags.length > 0 && (
                <div className="material-tags">
                  {material.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      <Modal
        title={editingMaterial ? '编辑素材' : '添加素材'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="素材标题" />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="选择分类">
              {Object.entries(categoryMap).map(([key, value]) => (
                <Option key={key} value={key}>{value.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea rows={6} placeholder="素材内容" />
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            extra="多个标签用逗号分隔"
          >
            <Input placeholder="如：春节, 祝福语" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaterialLibrary;
