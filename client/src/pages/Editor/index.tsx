import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";
import "./index.scss";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function Community() {
  const [articles, setArticles] = useState([
    { title: "test1", content: "hello world!" },
    { title: "test2", content: "hello world!" },
  ]);
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState({});

  const handleTiltleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="add-item">
          <PlusOutlined style={{ marginRight: "5px" }} />
          新建文章
        </div>
        {articles.map((article) => (
          <div className="left-item">{article.title}</div>
        ))}
      </div>
      <div className="right">
        <Input
          size="large"
          showCount
          style={{ border: "none" }}
          maxLength={20}
          value={title}
          placeholder="请输入标题"
          onChange={handleTiltleChange}
        />
        <div className="content-area" data-color-mode="light">
          <MDEditor value={value} onChange={setValue} height="100%" />
          {/* <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: "pre-wrap" }}
          /> */}
        </div>
      </div>
    </div>
  );
}
