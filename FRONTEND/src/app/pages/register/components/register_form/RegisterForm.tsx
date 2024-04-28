"use client";
import Button from "@/app/components/button/Button";
import InputField from "@/app/components/input_field/InputField";
import {RegisterUserDTO} from "@/app/models/RegisterUserDTO";
import {Register} from "@/app/services/AuthService";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useRef} from "react";
import {useFormStatus} from "react-dom";
import toast from "react-hot-toast";

export function RegisterForm() {

  const {pending} = useFormStatus()
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const registerInfo: RegisterUserDTO = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    const reponse = await Register(registerInfo);


    ref.current?.reset();

    if(formData.get("password") !== formData.get("passwordag")) {
      toast.error("Passwords do not match");
      return;
    }


    if (reponse.error ) {
      toast.error(reponse.error);
      return;
    }



    toast.success("Registered successfully");
    setTimeout(() => {
      router.push("/pages/login");
    }, 1000);

  };
  return (
    <form action={handleSubmit} ref={ref}>
      <div style={{margin: "0.5rem", padding: "0rem 2.5rem"}}>
        <InputField type="text" name="username" label="username" required={true} />
      </div>
      <div style={{margin: "0.5rem", padding: "0rem 2.5rem"}}>
        <InputField type="text" name="email" label="email" required={true} />
      </div>
      <div style={{margin: "0.5rem", padding: "0rem 2.5rem"}}>
        <InputField type="password" name="password" label="password" required={true} />
      </div>
      <div style={{margin: "0.5rem", padding: "0rem 2.5rem"}}>
        <InputField type="password" name="passwordag" label="password again" required={true} />
      </div>
      <div className="m-3 mb-0">
        <button className="btn btn-dark m-3 p-2" disabled={pending}>
          <span className="fs-5 p-2" >Register</span>
        </button>
      </div>
      <div className="mb-3">
        <Link href="/pages/login" className="m-2 text-decoration-none text-center">
          You already have an account?
        </Link>
      </div>
    </form>
  );

}
