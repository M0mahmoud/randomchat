import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  SmilePlus,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 rtl:text-right ltr:text-left">
          {t("welcome_message")}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {t("description")}
        </p>
        <Link
          href="/chat"
          className="text-lg px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center w-fit rounded-lg mx-auto mb-4 transition-colors"
        >
          Global Chat <ArrowRight className="ms-2 h-5 w-5" />
        </Link>
        <Link
          href="/random"
          className="text-lg px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center w-fit rounded-lg mx-auto transition-colors"
        >
          Random Chat <ArrowRight className="ms-2 h-5 w-5" />
        </Link>
        <div className="mt-12 flex justify-center gap-12">
          <div className="flex flex-col items-center">
            <SmilePlus className="h-12 w-12 text-primary mb-2" />
            <p className="text-foreground font-medium">
              {t("instant_connections")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-12 w-12 text-primary mb-2" />
            <p className="text-foreground font-medium">{t("safe_secure")}</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="h-12 w-12 text-primary mb-2" />
            <p className="text-foreground font-medium">
              {t("fun_conversations")}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
