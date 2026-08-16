const roles = [
  { emoji: "✨", label: "Strategic Designer" },
  { emoji: "👾", label: "AI Designer" },
  { emoji: "🚀", label: "Rapid Prototyper" },
  { emoji: "💬", label: "Workshop Facilitator" },
];

// Repeated enough times that a full set is always on screen at any
// viewport width, so the loop never runs out of content mid-scroll.
const repeatedRoles = Array.from({ length: 8 }, () => roles).flat();

function RoleItem({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="shrink-0 whitespace-nowrap text-[18px] leading-[35px] text-foreground">
      {emoji} <span className="text-accent">{label}</span>
    </span>
  );
}

export default function RolesMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-[60px]">
        {repeatedRoles.map((role, i) => (
          <RoleItem key={`${role.label}-${i}`} {...role} />
        ))}
      </div>
    </div>
  );
}
