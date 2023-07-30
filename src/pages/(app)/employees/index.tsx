import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { z } from "zod";
import { SuspenseDepartmentLabel } from "@/components/domains/DepartmentLabel/DepartmentLabel";
import { employeeSchema, type Employee } from "@/models/employee";
import { fetcher } from "@/utils/fetcher";
import styles from "./index.module.css";
import type { LoaderFunction } from "react-router-dom";

export const Loader = (async () => {
  try {
    const response = await fetcher.get<Employee[]>("http://127.0.0.1:3000/api/v1/employees");

    return z.array(employeeSchema).parse(response.data);
  } catch (error) {
    return [];
  }
}) satisfies LoaderFunction;

export default function EmployeesPage() {
  const employees = useLoaderData() as Awaited<ReturnType<typeof Loader>>;

  return (
    <>
      <Helmet>
        <title>従業員一覧 | 社内管理システム</title>
      </Helmet>

      <ul className={styles.list}>
        {employees.map((employee) => (
          <li key={employee.id} className={styles.item}>
            <Link className={styles.link} to={`/employees/${employee.id}`}>
              <article className={styles.card}>
                <hgroup>
                  <p>
                    <SuspenseDepartmentLabel id={employee.id} />
                  </p>
                  <h1 className={styles.name}>
                    {employee.last_name} {employee.first_name}
                  </h1>
                </hgroup>

                <p className={styles.birthday}>
                  <time dateTime={employee.birthday}>
                    {dayjs(employee.birthday).format("YYYY年MM月DD日")}
                  </time>
                  生まれ
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
