import { permanentRedirect } from "next/navigation";

// "Preaching" and "Scripture" were merged into a single "Teaching" section.
export default function SermonTrendsPage() {
  permanentRedirect("/trends/teaching");
}
