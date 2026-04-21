"use client";

import React from "react";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/schema";
import { z } from "zod";
import { formType } from "@/lib/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signup, login } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../ui/password-input";

const AuthForm = ({ type }: { type: formType }) => {
  const router = useRouter();
  const authFormSchema = formSchema(type);
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      fullNames: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
    if (type === "signup") {
      const { fullNames, email, password } = values;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const result = await signup({
        uid: userCredentials.user.uid,
        name: fullNames!,
        email,
        password,
      });

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }
      toast.success("Account created successfully");
      router.push("/login");
    } else {
      const { email, password } = values;
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredentials.user.getIdToken();
      if (!idToken) {
        toast.error("Invalid Credentials");
        return;
      }
      await login({ email, idToken });
      toast.success("Login successfully");
      router.push("/");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left panel */}
      <div className="flex flex-col justify-center items-center w-full border-r border-input/50">
        <div className="flex flex-row gap-2 justify-center mb-4">
          <h1 className="font-bold text-3xl md:text-4xl">PrepView</h1>
        </div>
        <div className="flex flex-col p-14 gap-6 max-w-xl w-full mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "signup" && (
                <FormField
                  control={form.control}
                  name="fullNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fullNames">Full Names</FormLabel>
                      <FormControl>
                        <Input {...field} id="fullNames" placeholder="Enter your full names" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormControl>
                      <Input {...field} id="email" placeholder="Enter your email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        id="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href="/forgot-password"
                className="text-sm text-end block text-primary underline"
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                className="rounded-lg w-full py-6 cursor-pointer"
              >
                {type === "signup" ? "Create Account" : "Login"}
              </Button>
              {type === "signup" ? (
                <p className="text-sm">
                  Already have an account?
                  <span>
                    <Link href="/login" className="font-bold underline">
                      {" "}Login
                    </Link>
                  </span>
                </p>
              ) : (
                <p className="text-sm text-end">
                  Have no account?
                  <span>
                    <Link href="/signup" className="font-bold underline">
                      {" "}Signup
                    </Link>
                  </span>
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:block">
        <img
          src="/auth-bg.jpg"
          alt="Auth background image"
          className="h-screen w-full object-cover sticky top-0"
        />
      </div>
    </div>
  );
};

export default AuthForm;