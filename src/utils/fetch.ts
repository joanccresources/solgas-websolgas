import { api } from "@/config";

export const get = async ({
  path,
  revalidate = 0,
  params
}: {
  path: string;
  revalidate?: number;
  params?: Record<string, string>;
}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const options: RequestInit = {
      next: { revalidate },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = params ? `${api}${path}?${queryParams}` :  `${api}${path}`
    const data = await fetch(url, options);
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

export const post = async ({
  path,
  params,
}: {
  path: string;
  params: unknown;
}) => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    const data = await fetch(`${api}${path}`, options);
    return data.json();
  } catch (error) {
    console.log("error ->", error);
  }
};
