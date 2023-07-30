import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { z } from "zod";
import { SuspenseDepartmentLabel } from "@/components/domains/DepartmentLabel/DepartmentLabel";
import { employeeSchema, type Employee } from "@/models/employee";
import { fetcher } from "@/utils/fetcher";
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

      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <Link to={`/employees/${employee.id}`}>
              <dl>
                <dt>名前</dt>
                <dd>
                  {employee.last_name} {employee.first_name}
                </dd>

                <dt>誕生日</dt>
                <dd>{dayjs(employee.birthday).format("YYYY年MM月DD日")}</dd>

                <dt>部署ID</dt>
                <dd>
                  <SuspenseDepartmentLabel id={employee.id} />
                </dd>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
