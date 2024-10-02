import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chat Stranger",
    short_name: "ChatStranger",
    description:
      "Connect with strangers and make new friends through random chat!",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
  };
}
