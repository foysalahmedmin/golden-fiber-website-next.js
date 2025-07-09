import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextTrigger,
  CarouselPagination,
  CarouselPreviousTrigger,
} from "@/components/ui/Carousel";
import { MoveUpRight } from "lucide-react";
import BannerSlide from "./BannerSlide";

const BannerSection = () => {
  const data = [
    {
      title: "Fashionable Jute Bags",
      subTitle: "Welcome to Golden Fiber Asia",
      description: `Explore our handcrafted jute bags that blend style with sustainability. 
    Perfect for daily use, shopping, or gifting — made from 100% eco-friendly golden fiber asia.`,
      image: {
        src: "/images/home/home-banner-1.png",
        alt: "home-slider-image-1",
      },
      button: {
        label: "Shop Now",
        path: "/shop",
        icon: MoveUpRight,
      },
    },
    {
      title: "Elegant Jute Storage Boxes",
      subTitle: "Welcome to Golden Fiber Asia",
      description: `Organize your space naturally with our stylish jute boxes. 
    Durable, biodegradable, and beautifully designed for conscious living.`,
      image: {
        src: "/images/home/home-banner-2.png",
        alt: "home-slider-image-2",
      },
      button: {
        label: "Shop Now",
        path: "/shop",
        icon: MoveUpRight,
      },
    },
  ];
  return (
    <section className="h-full">
      <div className="dark size-full">
        <section className="size-full rounded-md border bg-dark text-dark-foreground">
          <Carousel
            className="group/carousel relative size-full"
            opts={{ loop: true }}
            autoplay
          >
            <CarouselContent>
              {data.map((item, index) => (
                <CarouselItem key={index} className="group/slide">
                  <BannerSlide item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPreviousTrigger
              className="invisible absolute left-8 hidden -translate-x-full opacity-0 transition-all duration-300 group-hover/carousel:visible group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100 md:inline-flex"
              shape="icon"
              size="md"
            />
            <CarouselNextTrigger
              className="invisible absolute right-8 hidden translate-x-full opacity-0 transition-all duration-300 group-hover/carousel:visible group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100 md:inline-flex"
              shape="icon"
              size="md"
            />
            <CarouselPagination />
          </Carousel>
        </section>
      </div>
    </section>
  );
};

export default BannerSection;
