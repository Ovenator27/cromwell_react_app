import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <main className="app">
      <Header />
      <Outlet />
    </main>
  );
}
