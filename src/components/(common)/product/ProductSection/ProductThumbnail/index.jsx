import {
  Tabs,
  TabsContent,
  TabsItem,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs";
import { urls } from "@/lib/base";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductThumbnail = ({ className, product }) => {
  const { name, media } = product || {};
  const { thumbnail, gallery } = media || {};

  const image = urls?.product_thumbnail + "/" + thumbnail;
  const othersImages =
    gallery?.map((item) => urls.product_gallery + "/" + item) || [];

  const isImages = othersImages?.length > 0;
  const images = [image, ...(isImages ? othersImages : [])];

  return (
    <>
      <div
        className={cn(
          "grid h-[32rem] w-full flex-1 grid-cols-1 grid-rows-1",
          className,
        )}
      >
        <Tabs
          value={0}
          className="static flex size-full flex-col-reverse gap-4 md:flex-row"
        >
          {isImages && (
            <TabsList className="flex h-40 w-full gap-4 overflow-hidden md:h-full md:w-1/4 md:flex-col xl:w-1/6">
              {images?.map((image, i) => (
                <TabsTrigger
                  className="block w-full flex-1 overflow-hidden rounded-md border bg-muted/25 p-[0.25em] shadow-inner after:border-y after:border-primary/25 hover:bg-primary/5 dark:bg-background"
                  activeClassName="bg-primary/15 after:rounded-md after:border-x-2 after:border-y-2"
                  key={i}
                  value={i}
                >
                  <Image
                    className="size-full object-contain object-center"
                    height={50}
                    width={50}
                    src={image}
                    alt={name}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          )}
          <TabsContent className="flex-1">
            {images?.map((image, i) => (
              <TabsItem
                key={i}
                value={i}
                className="size-full overflow-hidden rounded-md border bg-muted/25 p-[1em] shadow-inner dark:bg-background"
              >
                <Image
                  className="size-full object-contain object-center"
                  height={400}
                  width={400}
                  src={image}
                  alt={name}
                />
              </TabsItem>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProductThumbnail;
