"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthCookies = async (data) => {
  const cookiesData = await cookies();

  cookiesData.set("access-token", data?.accessToken);
  cookiesData.set("refresh-token", data?.refreshToken);
  cookiesData.set("role", data?.role);
};

export const removeAuthCookies = async () => {
  const cookiesData = await cookies();

  cookiesData.delete("access-token");
  cookiesData.delete("refresh-token");
  cookiesData.delete("role");
  redirect(`/`);
};
