import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Home, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("404");
  return (
    <div className="min-h-dvh bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {t("title")}
        </h2>
        <div className="text-4xl mb-8 animate-bounce">💬</div>
        <p className="text-xl text-gray-600 mb-8">{t("description")}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="text-lg px-6 py-3" size="lg">
            <Link href="/">
              <Home className="me-2 h-5 w-5" />
              {t("go_home")}
            </Link>
          </Button>
          <Button
            asChild
            className="text-lg px-6 py-3"
            size="lg"
            variant="outline"
          >
            <Link href="/chat">
              <MessageCircle className="me-2 h-5 w-5" />
              {t("start_chatting")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
