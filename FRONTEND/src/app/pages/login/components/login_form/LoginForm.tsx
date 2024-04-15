"use client";
import Button from "@/app/components/button/Button";
import InputField from "@/app/components/input_field/InputField";
import {LoginUserDTO} from "@/app/models/LoginUserDTO";
import {Login} from "@/app/services/AuthService";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useRef, useState} from "react";
import {useFormStatus} from "react-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {pending} = useFormStatus()
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const loginInfo: LoginUserDTO = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    const toastId = toast.loading("Logging in...");
    const reponse = await Login(loginInfo);
    toast.dismiss(toastId);

    ref.current?.reset();

    if (reponse.error) {
      toast.error(reponse.error);
      return;
    }

    redirect("/pages/ongoingCompetitions");
  };

  return (

    <form ref={ref} action={handleSubmit}>
      <div style={{margin: "0.5rem", padding: "0rem 3.75rem"}}>
        <InputField type="text" name="email" label="email" required={true} />
      </div>
      <div style={{margin: "0.5rem", padding: "0rem 3.75rem"}}>
        <InputField
          type="password"
          name="password"
          label="Password"
          required={true}
        />
      </div>
      <div className="m-3 mb-0">
        <button className="btn btn-dark m-3 mb-0 p-2" disabled={pending}>
          <span className="fs-5 p-2" >Login</span>
        </button>
      </div>loginform
      <div className="mb-3">
        <Link href="/pages/register" className="mb-3 fs-6 text-decoration-none">
          Create an account
        </Link>

      </div>

    </form>
  );
}
