import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
