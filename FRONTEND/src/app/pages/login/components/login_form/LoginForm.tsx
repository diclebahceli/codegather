"use client";
import Button from "@/app/components/button/Button";
import InputField from "@/app/components/input_field/InputField";
import {LoginUserDTO} from "@/app/models/LoginUserDTO";
import {Login} from "@/app/services/AuthService";
import {redirect} from "next/navigation";
import {useRef, useState} from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loggignIn, setLoggingIn] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const loginInfo: LoginUserDTO = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    setLoggingIn(true);
    const toastId = toast.loading("Logging in...");
    const reponse = await Login(loginInfo);
    setLoggingIn(false);
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
        <InputField type="text" name="email" label="email" />
      </div>
      <div style={{margin: "0.5rem", padding: "0rem 3.75rem"}}>
        <InputField
          type="password"
          name="password"
          label="Password"
        />
      </div>

      <div className="m-3">
        <button className="btn btn-dark m-3 p-2" disabled={loggignIn}>

          <span>Login</span>
        </button>
      </div>

    </form>
  );
}
