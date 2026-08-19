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
    <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo-500/5 px-3.5 py-1.5 outline outline-1 -outline-offset-1 outline-indigo-500/20">
      <span className="text-sm leading-5 font-medium text-accent">{emoji}</span>
      <span className="text-sm leading-5 font-medium whitespace-nowrap text-accent">
        {label}
      </span>
    </div>
  );
}

// Fades the marquee to transparent at both edges (matching the Athos
// reference) so items scroll in/out softly rather than clipping abruptly
// at the container boundary.
const edgeFadeStyle = {
  maskImage:
    "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)",
};

export default function RolesMarquee() {
  return (
    <div className="w-full overflow-hidden" style={edgeFadeStyle}>
      <div className="animate-marquee flex w-max items-center gap-6">
        {repeatedRoles.map((role, i) => (
          <RoleItem key={`${role.label}-${i}`} {...role} />
        ))}
      </div>
    </div>
  );
}
