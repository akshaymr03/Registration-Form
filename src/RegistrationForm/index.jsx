import { Button, Checkbox, Col, Form, Input, message, Row, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validatePassword = (_, value) => {
  if (!value) return Promise.reject('Password is required');
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return pattern.test(value)
    ? Promise.resolve()
    : Promise.reject(
        'Must be 8+ chars, include uppercase, lowercase, number & special char'
      );
};

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
        type: 'success',
        content: 'Registration successful',
        });
    };

    const onFinish = (values) => {
        console.log('Submitted Data:', values);
        success()
        form.resetFields();
    };

  return (
    <Content style={{ padding: '20px' }}>
        {contextHolder}
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={2}>Registration</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={18}>
          <Form
            {...layout}
            form={form}
            name="registration"
            onFinish={onFinish}
            style={{
                maxWidth : 800
            }}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 3, message: 'Must be at least 3 characters' },
              ]}
              hasFeedback
            >
              <Input placeholder="Full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email format' },
              ]}
              hasFeedback
            >
              <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[
                { required: true, message: 'Please enter your mobile number' },
                {
                  pattern: /^\d{10}$/,
                  message: 'Must be a 10‑digit number',
                },
              ]}
              hasFeedback
            >
              <Input placeholder="10‑digit mobile number" maxLength={10} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ validator: validatePassword }]}
              hasFeedback
              required
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value !== getFieldValue('password')) {
                      return Promise.reject('Passwords do not match');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject('You must accept the Terms and Conditions'),
                },
              ]}
            >
              <Checkbox>I accept the Terms and Conditions</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

export default RegistrationForm;
