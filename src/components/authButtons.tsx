import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";

export const AuthButtons = async () => {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("token")?.value;
  return (
    <>
      {!isAuth ? (
        <>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </>
      ) : (
        <div className="w-full flex justify-between">
          <Link href={`/dashboard`}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
