import type { Metadata } from "next"
import Link from "next/link"
import { UserRegisterForm } from "@/components/user-register-form"

export const metadata: Metadata = {
  title: "Register | Topview AI",
  description: "Create a new Topview AI account",
}

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="4" height="12" fill="#6366F1" />
              <rect x="10" y="4" width="4" height="16" fill="#6366F1" />
              <rect x="18" y="2" width="4" height="18" fill="#6366F1" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create a Topview AI account</p>
        </div>
        <UserRegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

