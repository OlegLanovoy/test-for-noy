"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("token")?.value;
  if (isAuth) {
    cookieStore.delete("token");
  }
};
