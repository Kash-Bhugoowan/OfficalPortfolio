const LINKEDIN_URL = "https://www.linkedin.com/in/karishma-bhugoowan/";

export default function Footer() {
  return (
    <div className="relative mt-[140px] flex h-32 w-full flex-col justify-center border-t border-white/5 bg-bg-inverse px-6 md:block md:px-0">
      <div className="flex flex-col items-start justify-start md:absolute md:top-[41px] md:left-[100px]">
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="justify-start font-['Manrope'] text-lg leading-7 font-medium text-white/90">
            Karishma Bhugoowan
          </div>
        </div>
        <div className="flex h-6 w-44 flex-col items-start justify-start pt-1">
          <div className="justify-start font-['DM_Sans'] text-xs leading-5 font-normal tracking-tight text-white/40">
            Product Designer · London
          </div>
        </div>
      </div>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        data-property-1="link"
        data-property-2="default"
        className="absolute top-1/2 right-6 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-white md:top-[51px] md:right-[100px] md:translate-y-0"
      >
        <svg viewBox="0 0 24 24" className="size-4.5" fill="#1c1726">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
        </svg>
      </a>
    </div>
  );
}
