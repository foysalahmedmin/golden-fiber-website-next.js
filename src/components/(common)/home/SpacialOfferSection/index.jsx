import TimeCounter from "@/components/partials/TimeCounter";
import { Button } from "@/components/ui/Button";
import { project } from "@/constants/project";
import Image from "next/image";

const SpacialOfferSection = () => {
  return (
    <section>
      <div className="container">
        <div className="dark rounded-md border bg-dark px-8 py-16 text-dark-foreground md:px-16 md:py-24">
          <div className="grid items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="max-w-lg space-y-6 text-center md:space-y-8 md:text-left xl:col-span-2">
              <div>
                <h1 className="text-3xl text-neutral-50 md:text-5xl">
                  Make your environment setup eco-friendly and stylish
                </h1>
                <span className="mt-4 block">
                  Start Your Daily Shopping with
                  <span className="text-primary"> {project?.name}</span>
                </span>
              </div>
              <div>
                <TimeCounter endDate="2025-01-01" />
              </div>
              <div className="hidden md:block">
                <Button>Shop Now</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  className="relative z-10"
                  src="/images/home/spacial-offer-banner.png"
                  alt="banner"
                  width={500}
                  height={500}
                />
                <div
                  style={{
                    background:
                      "radial-gradient(circle, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 0%) 60%)",
                  }}
                  className="absolute inset-0 size-full rounded-full bg-contain"
                />
              </div>
            </div>
            <div className="text-center md:hidden">
              <Button>Shop Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpacialOfferSection;
