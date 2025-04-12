"use client";

import React from "react";
import Image from "next/image";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
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
      //user authentication
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //sign up
      const result = await signup({
        uid: userCredentials.user.uid,
        name: fullNames!,
        email,
        password,
      });

      if (!result?.success) {
        toast.error(result?.message);
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
        toast.error("Signin failed");
        return;
      }
      await login({
        email,
        idToken,
      });
      toast.success("Login successfully");
      router.push("/");
    }
  };
  return (
    <div className="mt-32 card-border mx-auto lg:min-w-[566px]">
      <div className="flex flex-col card p-14 gap-6">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" width={20} height={20} alt="Logo" />
          <h1 className="font-semibold text-lg">PrepView</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {type === "signup" && (
              <FormField
                control={form.control}
                name="fullNames"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full names" />
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
                  <FormControl>
                    <Input {...field} placeholder="Enter your email address" />
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
                  <FormControl>
                    <Input {...field} placeholder="Enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-full w-full">
              {type === "signup" ? "Create Account" : "Login"}
            </Button>
            {type === "signup" ? (
              <p className="text-sm">
                Already have an account?
                <span>
                  <Link href="/login">Login</Link>
                </span>
              </p>
            ) : (
              <p className="text-sm">
                Have no account?
                <span>
                  <Link href="/signup"> Signup</Link>
                </span>
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
