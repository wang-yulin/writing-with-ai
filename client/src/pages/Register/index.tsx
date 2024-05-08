import { Button, Form, Input } from "antd";
// import { setToken } from "../../tools/auth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { registerApi } from "@/api/register";
import type { RegisterRequestData } from "@/api/register/types/register";

export default function Login() {
  const navigator = useNavigate();

  const handleLogin = () => {
    navigator("/login");
  };

  const onFinish = async (values: RegisterRequestData) => {
    const data = await registerApi(values);
    console.log("Received values of form: ", data);
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
          rules={[{ required: true, message: "请输入登录名!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="输入登录名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入登录密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="输入登录密码"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请再次输入登录密码!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("密码输入不一致"));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="再次输入登录密码"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              已有账号？
              <span
                onClick={handleLogin}
                style={{ color: "#FF9C08", cursor: "pointer" }}
              >
                立即登录
              </span>
            </p>
            {/* <p style={{ cursor: "pointer", color: "#1677ff" }}>忘记密码?</p> */}
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
