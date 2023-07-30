import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export type HeaderProps = {
  className?: string;
};

const menu = [
  {
    to: "/",
    label: "ホーム",
  },
  {
    to: "/employees",
    label: "従業員",
  },
  {
    to: "/departments",
    label: "部署",
  },
];

export const Header = (props: HeaderProps) => {
  const { className } = props;

  return (
    <header className={clsx(styles.module, className)}>
      <h1 className={styles.title}>社内管理システム</h1>

      <nav aria-label='サイトメニュー'>
        <ul className={styles.list}>
          {menu.map(({ label, to }, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
                to={to}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
