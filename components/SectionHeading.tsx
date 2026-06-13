import Link from "next/link";

/** The mono eyebrow + hairline rule used to open every homepage section. */
export default function SectionHeading({
  label,
  action,
}: {
  label: string;
  action?: { href: string; label: string };
}) {
  return (
    <div
      className="font-mono"
      style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8578", padding: "32px 0 20px", display: "flex", alignItems: "center", gap: 16 }}
    >
      {label}
      <span style={{ flex: 1, height: 1, background: "#C8C4B8", display: "block" }} />
      {action && (
        <Link href={action.href} style={{ color: "#5C7A5F", textDecoration: "none", whiteSpace: "nowrap" }}>
          {action.label} →
        </Link>
      )}
    </div>
  );
}
