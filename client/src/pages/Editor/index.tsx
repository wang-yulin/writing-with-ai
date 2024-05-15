import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Article } from "../../api/article/types/article";

import {
  createApi,
  getAllArticlesApi,
  getArticleByIdApi,
  updateArticleApi,
} from "@/api/article";

export default function Community() {
  const [articles, setArticles] = useState<Article[]>();
  const [article, setArticle] = useState<Article>({} as Article);
  const timer = useRef<ReturnType<typeof setTimeout>>();

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

  return (
    <div className="container">
      <div className="left">
        <div className="add-item" onClick={handleCreate}>
          <PlusOutlined style={{ marginRight: "5px" }} />
          新建文章
        </div>
        {articles?.map((item) => (
          <div
            onClick={() => handleActivate(item)}
            className={
              "left-item " + (article._id === item._id ? "active" : "")
            }
            key={item._id}
          >
            {item.title}
          </div>
        ))}
      </div>
      {!!articles?.length && (
        <div className="right">
          <Input
            size="large"
            showCount
            style={{ border: "none" }}
            maxLength={20}
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
  );
}
