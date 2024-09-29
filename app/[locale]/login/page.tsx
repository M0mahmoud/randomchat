import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (cookies().get("_SS")) {
    redirect("/chat");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
