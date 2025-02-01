"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addCookie = async (data) => {
  const cookiesData = await cookies();
  // Awaiting cookiesData for setting values
  cookiesData.set("access-token", data?.accessToken);
  cookiesData.set("refresh-token", data?.refreshToken);
  cookiesData.set("role", data?.role);
};

export const handleLogout = async () => {
  const cookiesData = await cookies();
  // Awaiting cookiesData for deleting values
  cookiesData.delete("access-token");
  cookiesData.delete("refresh-token");
  cookiesData.delete("role");
  redirect(`/`);
};

export const routespa = async () => {
  redirect(`/profile`);
};
