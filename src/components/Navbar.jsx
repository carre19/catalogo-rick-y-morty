import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { key: "/", label: <NavLink to="/">Home</NavLink> },
  { key: "/catalogo", label: <NavLink to="/catalogo">Catálogo</NavLink> },
];

export default function Navbar() {
  const location = useLocation();
  const selectedKey = location.pathname.startsWith("/catalogo")
    ? "/catalogo"
    : "/";

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={items}
    />
  );
}
