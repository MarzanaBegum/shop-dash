"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { SafeUser } from "../../../type";
import { signIn } from "next-auth/react";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        // toast.success("Account created");
        // router.push("/cart");
        // router.refresh();
        const { name: _name, ...signInData } = data;
        signIn("credentials", {
          ...signInData,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className="text-center">Logged in.Redirecting...</p>;
  }
  return (
    <>
      <Heading title="Sign up for E~Shop" />
      <Button
        label="Sign up with Google"
        outline
        Icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="w-full bg-slate-300 h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
