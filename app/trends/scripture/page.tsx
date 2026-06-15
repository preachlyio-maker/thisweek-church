import { permanentRedirect } from "next/navigation";

// "Preaching" and "Scripture" were merged into a single "Teaching" section.
export default function ScriptureTrendsPage() {
  permanentRedirect("/trends/teaching");
}
