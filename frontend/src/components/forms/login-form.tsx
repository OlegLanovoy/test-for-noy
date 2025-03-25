"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginUser, registerUser } from "@/services/auth.service";

type AuthType = "login" | "register";

interface LoginFormProps {
  type: AuthType;
}

export default function LoginForm({ type }: LoginFormProps) {
  const isLogin = type === "login";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
      } else {
        const data = await registerUser(name, email, password);
        localStorage.setItem("token", data.token);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm p-6 bg-white border rounded-xl shadow-md"
      >
        <h1 className="text-xl font-semibold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isLogin
              ? "Logging in..."
              : "Registering..."
            : isLogin
            ? "Login"
            : "Register"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href={isLogin ? "/register" : "/login"}
            className="text-blue-600 hover:underline ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </a>
        </p>
      </form>
    </div>
  );
}
