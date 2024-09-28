import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  console.log("URL:", locale, segments);

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}
export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
