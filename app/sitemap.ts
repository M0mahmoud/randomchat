import { MetadataRoute } from "next";

// const defaultLocale = "en" as const;
// const locales = ["en", "ar"] as const;

const host = "https://chatstranger.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry("/"),
    getEntry("chat"),
    getEntry("random"),
    getEntry("login"),
  ];
}

function getEntry(pathname: string): MetadataRoute.Sitemap[number] {
  return {
    url: getUrl(pathname),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
    //TODO: Not Work
    // alternates: {
    //   languages: Object.fromEntries(
    //     locales.map((locale) => [locale, getUrl(pathname, locale)])
    //   ),
    // },
  };
}

// function getUrl(pathname: string, locale: string) {
//   return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
// }
// Without Locale for now.
function getUrl(pathname: string) {
  return `${host}/${pathname === "/" ? "" : pathname}`;
}
