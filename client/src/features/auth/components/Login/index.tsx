import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import AuthService from '../services/AuthService';
import useGuard from '../hooks/useGuard';

const Login = () => {
  // 토큰 있을 경우 홈으로
  useGuard();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
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
    const { username, password } = formData;
    try {
      setIsSubmitting(true);
      const response = await AuthService.signIn({
        username,
        password,
      });

      // 로그인 성공 토큰
      AuthService.setToken(response.data.token);
      // Home으로 경로 이동
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, navigate]);

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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
