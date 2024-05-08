import { Button, Form, Input } from "antd";
// import { setToken } from "../../tools/auth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";

export default function Login() {
  const navigator = useNavigate();
  // const handleLogin = () => {
  //   const preToken: object = {
  //     token: "hjsdbvfjhysebfjkd762354",
  //     expired: Date.now(),
  //   };
  //   console.log(JSON.stringify(preToken));

  //   setToken(JSON.stringify(preToken)); //模拟设置token
  //   navigator(`/`);
  // };
  const handleRegister = () => {
    navigator("/register");
  };

  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="login-form">
      <Form
        style={{ width: "300px" }}
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名或手机号!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名或手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入账号密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              还没有账号？
              <span
                onClick={handleRegister}
                style={{ color: "#FF9C08", cursor: "pointer" }}
              >
                立即注册
              </span>
            </p>
            <p style={{ cursor: "pointer", color: "#1677ff" }}>忘记密码?</p>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
