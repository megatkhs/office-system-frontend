import { Outlet } from "react-router-dom";
import { Header } from "@/components/composites/Header";
import styles from "./_layout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />

      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}
