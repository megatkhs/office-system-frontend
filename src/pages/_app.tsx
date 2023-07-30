import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export const Pending = () => <>読み込み中</>;

export default function App() {
  return (
    <>
      <Helmet>
        <title>社内管理システム</title>
      </Helmet>
      <Outlet />
    </>
  );
}
