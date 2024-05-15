import { Outlet, useNavigate } from "react-router-dom";

import "./index.scss";
export default function Layout() {
  const navigator = useNavigate();

  const handleChangeRoute = () => {
    navigator("/editor");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <p onClick={handleChangeRoute}>写文章</p>
      </div>
      <div className="main-app">
        <Outlet />
      </div>
    </div>
  );
}
