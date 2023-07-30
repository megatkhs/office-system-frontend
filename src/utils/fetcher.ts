type Method = "GET" | "POST" | "PUT" | "DELETE";

type FetcherResponse<T> = {
  response: Response;
  status: number;
  success: boolean;
  data: T;
};

const client = async <T>(
  method: Method,
  url: string,
  body?: BodyInit | null,
  options: Omit<RequestInit, "method" | "body"> = {}
): Promise<FetcherResponse<T>> => {
  const response = await fetch(url, {
    method,
    body,
    ...options,
  });

  // TODO: エラー時の設計

  return {
    response,
    status: response.status,
    success: response.ok,
    data: await response.json(),
  };
};

export const fetcher = {
  get: <T>(url: string) => client<T>("GET", url),
  post: <T>(url: string, body?: BodyInit | null) => client<T>("POST", url, body),
  put: <T>(url: string, body?: BodyInit | null) => client<T>("PUT", url, body),
  delete: <T>(url: string) => client<T>("DELETE", url),
};
