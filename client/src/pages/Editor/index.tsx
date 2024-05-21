import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Dropdown, Input, MenuProps, Modal, message } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Article } from "../../api/article/types/article";

import {
  createApi,
  getAllArticlesApi,
  getArticleByIdApi,
  updateArticleApi,
} from "@/api/article";
import { createFeedbackApi } from "@/api/comment";
import { marked } from "marked";

export default function Community() {
  const [articles, setArticles] = useState<Article[]>();
  const [article, setArticle] = useState<Article>({} as Article);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string>("");

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      handleUpdate(article);
    }, 500);
  }, [article]);

  const getAllArticles = async () => {
    const { data, statusCode } = await getAllArticlesApi();
    if (statusCode === 200) {
      setArticles(data);
      if (data.length) {
        setArticle(data[0]);
      }
    }
  };

  const handleTiltleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newArticle: Article = {
      title: e.target.value,
      content: article!.content,
      _id: article._id,
    };
    const newArticles = articles?.map((item) =>
      item._id === newArticle._id ? newArticle : item
    );
    setArticles(newArticles);
    setArticle(newArticle);
  };

  const handleContentChange = (val: string | undefined) => {
    const newArticle: Article = {
      title: article.title,
      content: val ?? "",
      _id: article._id,
    };
    setArticle(newArticle);
  };

  const handleCreate = async () => {
    const data = await createApi({
      title: dayjs().format("YYYY-MM-DD"),
      content: "",
    });
    if (data.statusCode === 200) {
      getAllArticles();
    }
  };

  const handleUpdate = async (article: Article) => {
    const { statusCode } = await updateArticleApi(article);
    if (statusCode === 200) {
      // setArticle(data);
    }
  };

  const handleActivate = async (item: Article) => {
    if (!item._id) return;
    const { data, statusCode } = await getArticleByIdApi(item._id);
    if (statusCode === 200) {
      setArticle(data);
    }
  };

  const handleCopy = (content: string) => {
    const htmlContent = marked(content) as string;
    const hiddenHtmlElement = document.createElement("div");
    hiddenHtmlElement.className = "wmde-markdown";
    hiddenHtmlElement.style.position = "absolute";
    hiddenHtmlElement.style.left = "-9999px";
    hiddenHtmlElement.innerHTML = htmlContent;
    document.body.appendChild(hiddenHtmlElement);

    const range = document.createRange();
    range.selectNode(hiddenHtmlElement);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      document.execCommand("copy");
      console.log("Copy to clipboard succeeded.", hiddenHtmlElement);
    } catch (err) {
      console.error("Copy to clipboard failed.", err);
    }

    window.getSelection()?.removeAllRanges();
    document.body.removeChild(hiddenHtmlElement);
  };

  const handleAIFeedback = async (item: Article) => {
    if (!item._id) return message.info("文章不存在！");
    const { data, statusCode } = await createFeedbackApi({
      id: item._id,
    });
    if (statusCode === 200) {
      setIsModalOpen(true);
      setAiFeedback(data);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "提交AI反馈",
      key: "1",
    },
    {
      label: "复制",
      key: "2",
    },
  ];

  const generateOnClick = (item: Article) => (e: { key: string }) => {
    handleDropdownClick(e.key, item);
  };

  const handleDropdownClick = (key: string, item: Article) => {
    if (key === "1") {
      handleAIFeedback(item);
    } else if (key === "2") {
      handleCopy(item.content);
    }
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="add-item" onClick={handleCreate}>
            <PlusOutlined style={{ marginRight: "5px" }} />
            新建文章
          </div>
          {articles?.map((item) => (
            <div
              className={article._id === item._id ? "active" : ""}
              key={item._id}
            >
              <div className="left-item">
                <div
                  title={item.title}
                  className="left-item-title"
                  onClick={() => handleActivate(item)}
                >
                  {item.title}
                </div>
                <Dropdown
                  menu={{ items, onClick: generateOnClick(item) }}
                  placement="bottom"
                >
                  <SettingOutlined style={{ cursor: "pointer" }} />
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
        {!!articles?.length && (
          <div className="right">
            <Input
              size="large"
              showCount
              style={{ border: "none", fontSize: "18px" }}
              maxLength={64}
              value={article?.title}
              placeholder="请输入标题"
              onChange={handleTiltleChange}
            />
            <div className="content-area" data-color-mode="light">
              <MDEditor
                value={article?.content}
                onChange={handleContentChange}
                height="100%"
              />

              {/* <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: "pre-wrap" }}
          /> */}
            </div>
          </div>
        )}
      </div>
      <Modal
        maskClosable={false}
        title="GPT如是说"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{aiFeedback}</p>
      </Modal>
    </>
  );
}
