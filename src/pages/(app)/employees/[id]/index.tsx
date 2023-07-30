import dayjs from "dayjs";
import {
  useLoaderData,
  type LoaderFunction,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
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

      <dl>
        <div>
          <dt>名前</dt>
          <dd>
            {employee.last_name} {employee.first_name}
          </dd>
        </div>

        <div>
          <dt>誕生日</dt>
          <dd>{dayjs(employee.birthday).format("YYYY年MM月DD日")}</dd>
        </div>

        <div>
          <dt>部署ID</dt>
          <dd>
            <SuspenseDepartmentLabel id={employee.id} />
          </dd>
        </div>

        <div>
          <dt>作成日時</dt>
          <dd>{dayjs(employee.created_at).format("YYYY年MM月DD日 hh:mm")}</dd>
        </div>

        <div>
          <dt>更新日時</dt>
          <dd>{dayjs(employee.updated_at).format("YYYY年MM月DD日 hh:mm")}</dd>
        </div>
      </dl>
    </div>
  );
}
