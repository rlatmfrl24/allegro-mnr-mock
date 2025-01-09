"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input } from "@headlessui/react";
import classNames from "classnames";
import styles from "@/styles/main.module.css";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-8 pb-32">
      <Image
        src="/logo-merged.svg"
        alt="Next.js logo"
        width={170}
        height={33}
        priority
        className="mb-20"
      />
      <div className="self-start">
        <p className="font-semibold text-2xl">Login</p>
        <p className="text-gray-500">Welcome to the app!</p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-6">
        <Input
          aria-label="company-id"
          className={styles.input}
          placeholder="Company ID"
        />
        <Input
          className={styles.input}
          aria-label="name"
          placeholder="User Name"
        />
        <Input
          className={styles.input}
          aria-label="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <a className="text-xs text-blue-800 hover:underline cursor-pointer">
          Forgot your password?
        </a>
        <label className="text-xs flex items-center gap-1 cursor-pointer select-none">
          <input type="checkbox" />
          Remember me
        </label>
      </div>
      <Button
        className={classNames(styles.bigButton, "mt-6")}
        onClick={() => router.push("/main")}
      >
        Login
      </Button>
    </div>
  );
}
