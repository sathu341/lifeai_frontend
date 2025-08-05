import React from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddDoctor = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.entries(values).forEach(([key, val]) => {
      if (key !== 'photo') formData.append(key, val);
    });

    // Add hospital_id from session
    formData.append("hospital_id", sessionStorage.getItem("admin_id"));

    // Append photo file
    if (values.photo && values.photo.file) {
      formData.append("photo", values.photo.file.originFileObj);
    }

    try {
      const response = await axios.post("https://symptom-checkers.onrender.com/api/register-doctor", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success("Doctor registered successfully!");
      console.log(response.data);
      form.resetFields();
    } catch (error) {
      message.error(error?.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Contact" name="contact" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Register Number" name="reg_no">
        <Input />
      </Form.Item>
      <Form.Item label="Department" name="department" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Qualification" name="qualification" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Photo"
        name="photo"
        valuePropName="file"
        getValueFromEvent={e => e?.file ? e : null}
        rules={[{ required: true, message: 'Please upload a photo' }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload Photo</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Register Doctor</Button>
      </Form.Item>
    </Form>
  );
};

export default AddDoctor;
