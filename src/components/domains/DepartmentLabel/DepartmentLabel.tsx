import { Suspense, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Spinner } from "@/components/elements/Spinner";
import { departmentsQuery } from "@/states/departmentsQuery";

export type DepartmentLabelProps = {
  id: number;
};

export const DepartmentLabel = (props: DepartmentLabelProps) => {
  const departments = useRecoilValue(departmentsQuery);
  const departmentName = useMemo(() => {
    const department = departments.find(({ id }) => id === props.id);

    return (department && department.name) || "情報なし";
  }, [departments, props.id]);

  return <>{departmentName}</>;
};

export const SuspenseDepartmentLabel = (props: DepartmentLabelProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <DepartmentLabel {...props} />
    </Suspense>
  );
};
