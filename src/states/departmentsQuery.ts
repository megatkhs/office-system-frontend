import { selector } from "recoil";
import { z } from "zod";
import { departmentSchema } from "@/models/department";
import { fetcher } from "@/utils/fetcher";

export const departmentsQuery = selector({
  key: "departments",
  get: async () => {
    const response = await fetcher.get("http://localhost:3000/api/v1/departments");
    return z.array(departmentSchema).parse(response.data);
  },
});
