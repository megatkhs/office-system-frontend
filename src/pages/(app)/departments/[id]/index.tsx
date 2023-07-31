import dayjs from "dayjs";
import {
  useLoaderData,
  type LoaderFunction,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { departmentDetailSchema } from "@/models/department";
import type { EmployeeDetail } from "@/models/employee";
import { fetcher } from "@/utils/fetcher";

export const Loader = (async ({ params }) => {
  try {
    const response = await fetcher.get<EmployeeDetail>(
      `http://127.0.0.1:3000/api/v1/departments/${params.id}`
    );

    if (response.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }

    return departmentDetailSchema.parse(response.data);
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
  const department = useLoaderData() as Awaited<ReturnType<typeof Loader>>;
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>戻る</button>
      </div>

      <article>
        <hgroup>
          <h1>{department.name}</h1>
          <p>{department.description}</p>
        </hgroup>

        <section>
          <h2>所属メンバー</h2>

          {department.employees.length ? (
            <ul>
              {department.employees.map((employee) => (
                <li key={employee.id}>
                  <Link to={`/employees/${employee.id}`}>
                    <article>
                      <h1>
                        {employee.last_name} {employee.first_name}
                      </h1>

                      <p>
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
          ) : (
            <p>所属無し</p>
          )}
        </section>

        <section>
          <h2>登録日時</h2>
          <p>{dayjs(department.created_at).format("YYYY年MM月DD日 hh:mm")}</p>
        </section>

        <section>
          <h2>更新日時</h2>
          <p>{dayjs(department.updated_at).format("YYYY年MM月DD日 hh:mm")}</p>
        </section>
      </article>
    </div>
  );
}
