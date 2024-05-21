import { Outlet, useNavigate } from "react-router-dom";

import "./index.scss";
export default function Layout() {
  const navigator = useNavigate();

  const handleChangeRoute = () => {
    navigator("/editor");
  };
  return (
    <div>
      <div className="main-header">
        <div onClick={() => navigator("/home")}>首页</div>
        <div onClick={handleChangeRoute}>写文章</div>
      </div>
      <div className="main-app">
        <Outlet />
      </div>
    </div>
  );
}
