import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';

import AuthService from '../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Input change event
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    []
  );

  // 회원가입 버튼
  const handleSubmit = useCallback(async () => {
    const { username, password, confirmPassword } = formData;

    // 패스워드 일치 여부
    if (password !== confirmPassword) {
      return alert('비밀번호가 정확하지 않습니다.');
    }
    try {
      setIsSubmitting(true);
      await AuthService.signUp({
        username,
        password,
      });

      // 회원 가입 성공
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <div className="max-w-[320px] mx-auto">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Username을 입력해주세요.',
            },
          ]}
        >
          <Input name="username" onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password를 입력해주세요.',
            },
          ]}
        >
          <Input.Password name="password" onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Password를 한번 더 입력해주세요.',
            },
          ]}
        >
          <Input.Password name="confirmPassword" onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
