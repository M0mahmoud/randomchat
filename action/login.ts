"use server";

import { cookies } from "next/headers";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export default async function loginAction(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const nickname = formData.get("nickname") as string;
    // const password = formData.get("password") as string;

    // const user = await signInWithEmailAndPassword(auth, email, password);
    if (!nickname) {
      return { success: false, message: "Enter ur nickname" };
    }

    cookies().delete("_SS");

    cookies().set("_SS", nickname);

    return { success: true, message: `Login successfully.` };
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
