"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function AuthButtons() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };
  return (
    <div className="flex justify-center gap-2 p-4">
      {loading ? (
        <>
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
        </>
      ) : !isAuth ? (
        <>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </>
      ) : (
        <>
          <Link href={`/dashboard`}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}
