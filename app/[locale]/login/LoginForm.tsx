"use client";

import loginAction from "@/action/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

import { useRouter } from "@/i18n/routing";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations("Login");
  const [state, formAction] = useFormState(loginAction, {
    success: false,
  });

  useEffect(() => {
    if (state?.success === true) {
      router.push(`/chat`);
    }
  }, [state?.success, router]);
  return (
    <Card className="w-full max-w-md">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="Enter your nickname"
              required
            />
          </div>

          {/* <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="ps-10"
                  required
                />
              </div>
            </div> */}
          {state.message && !state.success && (
            <p className="bg-gray-300 text-red-500 mt-4 rounded-sm p-2">
              {state.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <LoginButton />
          {/* <Button
              className="w-full"
              type="button"
              onClick={() => {
                const provider = new GoogleAuthProvider();
                signInWithRedirect(auth, provider);
              }}
            >
              Login with Google
            </Button> */}
        </CardFooter>
      </form>
    </Card>
  );
};

function LoginButton() {
  const t = useTranslations("Login");
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="w-full"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      {!pending ? t("submit_button") : t("submitting")}
    </Button>
  );
}

export default LoginForm;
