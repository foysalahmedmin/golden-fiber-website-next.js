import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className, asChild, href = "/", ...props }) => {
  const Comp = asChild ? "span" : Link;
  return (
    <Comp
      className={cn(
        "font-comfortaa flex items-center gap-1 uppercase tracking-widest",
        className,
      )}
      href={href}
      {...props}
    >
      <Image
        src="/images/partials/logo.png"
        width={50}
        height={50}
        alt="logo"
      />
      <span className="text-base text-title">
        <span className="text-yellow-500">Golden</span>{" "}
        <span className="text-primary">Fiber Asia</span>
      </span>
    </Comp>
  );
};

export default Logo;
