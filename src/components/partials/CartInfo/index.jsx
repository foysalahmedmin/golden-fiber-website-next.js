"use client";

import { Heart, HeartOutline } from "@/assets/images/icons/Heart";
import { Share } from "@/assets/images/icons/Share";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";

const CartInfo = ({ className }) => {
  const [isWishListed, setIsWishListed] = useState(false);

  const handleWishList = (e) => {
    e.stopPropagation();
    setIsWishListed(!isWishListed);
  };
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 text-[1em]",
        className,
      )}
    >
      <div className="translate-y-[1em] opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <Button
          className="h-[2.5em] bg-card text-[0.75em] text-title shadow hover:bg-primary hover:text-primary-foreground hover:shadow-primary"
          title="Wish List"
          shape="icon"
          onClick={(e) => handleWishList(e)}
        >
          {isWishListed ? (
            <Heart className="size-[1.5em] text-primary-foreground" />
          ) : (
            <HeartOutline className="size-[1.5em]" />
          )}
        </Button>
      </div>
      <div className="translate-y-[1em] opacity-0 transition-all delay-100 duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <Button
          className="h-[2.5em] bg-card text-[0.75em] text-title shadow hover:bg-primary hover:text-primary-foreground hover:shadow-primary"
          title="Quick View"
          shape="icon"
        >
          <Eye className="size-[1.5em]" />
        </Button>
      </div>
      <div className="translate-y-[1em] opacity-0 transition-all delay-200 duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <Button
          className="h-[2.5em] bg-card text-[0.75em] text-title shadow hover:bg-primary hover:text-primary-foreground hover:shadow-primary"
          title="Share"
          shape="icon"
        >
          <Share className="size-[1.5em]" />
        </Button>
      </div>
    </div>
  );
};

export default CartInfo;
