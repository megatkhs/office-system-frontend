import { z } from "zod";

/** 従業員一覧データ スキーマ */
export const employeeSchema = z.object({
  /** 従業員ID */
  id: z.number().positive(),
  /** 名字 */
  last_name: z.string(),
  /** 名前 */
  first_name: z.string(),
  /** 誕生日 */
  birthday: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  /** 部署ID */
  department_id: z.number().positive(),
});
/** 従業員一覧データ */
export type Employee = z.infer<typeof employeeSchema>;

/** 連絡先情報 スキーマ */
const contactSchema = z.object({
  label: z.string(),
  value: z.string(),
  type: z.string(),
});
/** 連絡先情報 */
export type Contact = z.infer<typeof contactSchema>;

/** 従業員詳細データ スキーマ */
export const employeeDetailSchema = z.object({
  id: z.number().positive(),
  first_name: z.string(),
  last_name: z.string(),
  birthday: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  department_id: z.number().positive(),
  created_at: z.string(),
  updated_at: z.string(),
  contacts: z.array(contactSchema),
});
/** 従業員詳細データ */
export type EmployeeDetail = z.infer<typeof employeeDetailSchema>;
