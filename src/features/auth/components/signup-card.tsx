"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFlow } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { signIn } = useAuthActions();
  const [error, setError] = useState("");

  const onAuthProvider = (value: "google" | "github") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(pending);
    });
  };

  const onPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (password !== confirmPassword) {
      setError("Password Doesn't Match");
    }

    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid Email or Password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8 font-medium">
      <CardHeader className="font-bold text-xl px-0 pt-0">
        <CardTitle>Create An Account</CardTitle>
        <CardDescription className="font-semibold text-base ">
          Use your Email Or other service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <form className="space-y-3" onSubmit={onPassword}>
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
          {!!error && (
            <div className="bg-destructive/15 flex items-center text-center text-destructive text-sm gap-x-2 my-6 p-2 font-semibold">
              <TriangleAlert size={15} />
              <p>{error}</p>
            </div>
          )}
          <Button
            type="submit"
            className="w-full font-semibold"
            size="lg"
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full gap-1 relative font-semibold"
            size="lg"
            disabled={pending}
            onClick={() => onAuthProvider("google")}
          >
            <FcGoogle size={20} className="absolute left-3" /> Continue With
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full gap-1 relative font-semibold"
            size="lg"
            disabled={pending}
            onClick={() => onAuthProvider("github")}
          >
            <FaGithub size={20} className="absolute left-3" /> Continue With
            Github
          </Button>
        </div>
        <p className="font-semibold">
          Already Have An Account.
          <span
            onClick={() => setState("signIn")}
            className="font-bold cursor-pointer pl-1 hover:underline "
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
