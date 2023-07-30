import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { z } from "zod";
import { departmentSchema } from "@/models/department";
import type { Department } from "@/models/department";
import { fetcher } from "@/utils/fetcher";
import styles from "./index.module.css";
import type { LoaderFunction } from "react-router-dom";

export const Loader = (async () => {
  try {
    const response = await fetcher.get<Department[]>("http://127.0.0.1:3000/api/v1/departments");

    return z.array(departmentSchema).parse(response.data);
  } catch (error) {
    return [];
  }
}) satisfies LoaderFunction;

export default function DepartmentsPage() {
  const departments = useLoaderData() as Awaited<ReturnType<typeof Loader>>;

  return (
    <>
      <Helmet>
        <title>部署一覧 | 社内管理システム</title>
      </Helmet>

      <ul className={styles.list}>
        {departments.map((department) => (
          <li key={department.id} className={styles.item}>
            <Link className={styles.link} to={`/departments/${department.id}`}>
              <article className={styles.card}>
                <hgroup>
                  <h1 className={styles.name}>{department.name}</h1>
                </hgroup>

                <p>{department.description}</p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
