import dayjs from "dayjs";
import { useLoaderData } from "react-router-dom";
import type { Employee } from "@/models/employee";
import type { LoaderFunction } from "react-router-dom";

export const Loader: LoaderFunction = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/v1/employees");
    return response;
  } catch {
    return [];
  }
};

export default function EmployeesPage() {
  const employees = useLoaderData() as Employee[];

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          <dl>
            <dt>名前</dt>
            <dd>
              {employee.last_name} {employee.first_name}
            </dd>

            <dt>誕生日</dt>
            <dd>{dayjs(employee.birthday).format("YYYY年MM月DD日")}</dd>

            <dt>部署ID</dt>
            <dd>{employee.department_id}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}
