import { z } from "zod";
import { employeeSchema } from "./employee";

/** 部署一覧データ スキーマ */
export const departmentSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  description: z.string(),
});
/** 部署一覧データ */
export type Department = z.infer<typeof departmentSchema>;

/** 部署詳細データ スキーマ */
export const departmentDetailSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  employees: z.array(employeeSchema),
});
/** 部署詳細データ */
export type DepartmentDetail = z.infer<typeof departmentDetailSchema>;
