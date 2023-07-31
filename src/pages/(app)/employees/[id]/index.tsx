import dayjs from "dayjs";
import {
  useLoaderData,
  type LoaderFunction,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  Link,
} from "react-router-dom";
import { SuspenseDepartmentLabel } from "@/components/domains/DepartmentLabel/DepartmentLabel";
import type { EmployeeDetail } from "@/models/employee";
import { employeeDetailSchema } from "@/models/employee";
import { fetcher } from "@/utils/fetcher";

export const Loader = (async ({ params }) => {
  try {
    const response = await fetcher.get<EmployeeDetail>(
      `http://127.0.0.1:3000/api/v1/employees/${params.id}`
    );

    if (response.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }

    return employeeDetailSchema.parse(response.data);
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}) satisfies LoaderFunction;

export const Catch = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data}</h2>
      </div>
    );
  }

  throw error;
};

export default function EmployeeDetailPage() {
  const employee = useLoaderData() as Awaited<ReturnType<typeof Loader>>;
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>戻る</button>
      </div>

      <article>
        <hgroup>
          <p>
            <Link to={`/departments/${employee.department_id}`}>
              <SuspenseDepartmentLabel id={employee.department_id} />
            </Link>
          </p>
          <h1>
            {employee.last_name} {employee.first_name}
          </h1>
        </hgroup>

        <p>
          <time dateTime={employee.birthday}>
            {dayjs(employee.birthday).format("YYYY年MM月DD日")}
          </time>
          生まれ
        </p>

        <section>
          <h2>登録日時</h2>
          <p>{dayjs(employee.created_at).format("YYYY年MM月DD日 hh:mm")}</p>
        </section>

        <section>
          <h2>更新日時</h2>
          <p>{dayjs(employee.updated_at).format("YYYY年MM月DD日 hh:mm")}</p>
        </section>
      </article>
    </div>
  );
}
