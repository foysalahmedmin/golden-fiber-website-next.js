import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Tabs, TabsContent, TabsItem, TabsTrigger } from "@/components/ui/Tabs";
import { urls } from "@/lib/base";
import { cn, toFixedAndLocaleStringCurrency } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCardButton from "../../Buttons/AddToCardButton";
import CartInfo from "../../CartInfo";
import TimeCounter from "../../TimeCounter";

const Thumbnail = ({ image, name, className }) => {
  return (
    <div
      className={cn(
        "h-[15em] w-full overflow-hidden border-b bg-muted/25 p-[1em] pb-[4em] shadow-inner dark:bg-background",
        className,
      )}
    >
      <Image
        className={cn(
          "size-full origin-center object-contain object-center transition-all duration-500 group-hover/card:scale-105 group-hover/card:brightness-95 group-hover/card:delay-200",
        )}
        height={320}
        width={260}
        src={image}
        alt={name}
      />
    </div>
  );
};

const Tags = ({ tags, className }) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-[1em] inline-flex flex-col gap-y-[0.25em]",
        className,
      )}
    >
      {tags?.map((tag, i) => (
        <span
          key={i}
          className={cn(
            "inline-block rounded-e-full bg-primary py-[0.25em] pl-[1em] pr-[0.5em] text-[0.75em] capitalize leading-none text-primary-foreground shadow",
            {
              "bg-primary": i % 3 === 0,
            },
            {
              "bg-secondary": (i - 1) % 3 === 0,
            },
            {
              "bg-tertiary": (i - 2) % 3 === 0,
            },
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const Price = ({ price, originalPrice, className }) => {
  return (
    <div
      className={cn(
        "relative inline-flex min-w-[50%] shrink-0 items-end justify-end gap-[0.25em] rounded-full bg-muted/25 py-[0.25em] pl-[0.5em] pr-[1em] text-end shadow-inner",
        className,
      )}
    >
      {originalPrice && (
        <del className="text-[0.75em] leading-none text-muted-foreground">
          $
          {toFixedAndLocaleStringCurrency({
            value: originalPrice,
          })}
        </del>
      )}
      {price && (
        <strong className="text-[1em] font-semibold leading-none text-title">
          $
          {toFixedAndLocaleStringCurrency({
            value: price,
          })}
        </strong>
      )}
    </div>
  );
};

const RatingReviews = ({ rating, totalReviews, className }) => {
  return (
    <div
      className={cn("flex items-center justify-between gap-[0.5em]", className)}
    >
      <StarRating rating={rating} className="text-[1em] leading-none" />
      <div className="flex items-center gap-[0.25em] text-[0.875em] leading-none">
        <span className="font-semibold leading-none text-secondary">
          {rating}
        </span>
        {totalReviews && (
          <>
            /<span className="leading-none text-primary">{totalReviews}</span>
          </>
        )}
      </div>
    </div>
  );
};

const StocksColorTabTriggers = ({ stocks, className }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-start gap-[0.5em] overflow-visible overflow-x-visible overflow-y-visible px-[0.25em]",
        className,
      )}
    >
      {stocks?.map((stock, i) => {
        return (
          <TabsTrigger
            key={i}
            value={stock?._id}
            className="flex size-[1.25rem] overflow-hidden rounded-full border-0 after:hidden"
            activeClassName="ring-[0.1rem] ring-muted-foreground/50 ring-offset-[0.1rem]"
          >
            <Button
              style={{ background: stock?.color?.code }}
              className="size-full rounded-full"
              variant="none"
              shape="icon"
              size="sm"
              asChild={true}
            />
          </TabsTrigger>
        );
      })}
    </div>
  );
};

const ProductOfferCardTab = ({
  product,
  stock,
  className,
  variant = "grid",
}) => {
  const {
    _id: productId,
    name,
    short_description,
    media,
    rating,
    totalReviews,
    stocks,
    tags,
    number_of_sales,
  } = product;
  const { thumbnail, gallery } = media || {};
  const {
    _id: stockId,
    selling_price,
    original_price,
    quantity: availableQuantity,
  } = stock || {};

  const image = urls?.product_thumbnail + "/" + thumbnail;
  const initialStock =
    parseInt(availableQuantity || 0) + parseInt(number_of_sales || 0);
  const availableStock = parseInt(availableQuantity || 0);

  const endDate = "";
  // const endDate = "2025-02-01";

  return (
    <TabsItem className="size-full" value={stockId}>
      <div className={cn("group/card size-full text-[1rem]", className)}>
        <div className="flex size-full flex-col">
          <div className="relative w-full overflow-hidden rounded-md">
            <Link
              href={productId ? `/shop/${productId}` : "#"}
              className="block size-full"
            >
              <Thumbnail image={image} name={name} />
            </Link>
            {tags && tags?.length > 0 && <Tags tags={tags} />}
            <div
              className={cn(
                "absolute bottom-[3em] left-0 right-0 w-full py-[1em]",
                {
                  "bottom-[5em]": !!endDate,
                },
              )}
            >
              <CartInfo />
            </div>
            {!!endDate && (
              <div className="absolute bottom-[3em] left-[1em] right-[1em] px-[1em] py-[0.5em] text-center">
                <TimeCounter endDate={endDate} variant="card" />
              </div>
            )}
          </div>
          <div className="relative -mt-[3em] flex grow flex-col px-[0.5em]">
            <div className="flex grow flex-col gap-y-[1em] rounded-md border bg-card px-[1em] py-[1em] shadow">
              <Link
                href={productId ? `/shop/${productId}` : "#"}
                className="space-y-[1em]"
              >
                <h3 className="text-[1em] leading-none text-title">{name}</h3>
                {short_description && (
                  <p className="line-clamp-3 text-[0.75em] leading-none text-foreground/75">
                    {short_description}
                  </p>
                )}
              </Link>
              <div className="flex items-center justify-between gap-[0.5em]">
                <progress value={availableStock || 0} max={initialStock || 0} />
                <div className="ml-[2px] flex items-center gap-[0.25em] text-[0.75em] leading-none">
                  <span className="font-semibold text-secondary">
                    {availableStock}
                  </span>
                  /<span className="text-primary">{initialStock}</span>
                </div>
              </div>
              {rating && (
                <RatingReviews
                  rating={rating}
                  totalReviews={totalReviews}
                  className="flex-col items-start"
                />
              )}
              <div className="flex items-start justify-between gap-[0.5em]">
                <div className="py-[0.165em]">
                  <StocksColorTabTriggers stocks={stocks} />
                </div>
                <Price
                  price={selling_price}
                  originalPrice={original_price}
                  className="-right-[1em] ml-auto rounded-e-none"
                />
              </div>
              <div className="!mt-auto">
                <AddToCardButton
                  className="primary w-full rounded-md rounded-t-none text-[0.875em] uppercase hover:bg-primary/75 group-hover/card:bg-primary group-hover/card:text-primary-foreground"
                  variant="outline"
                  productId={productId}
                  stockId={stockId}
                  availableQuantity={availableQuantity}
                >
                  <span>Add to Cart</span>{" "}
                  <ShoppingCart className="size-[1.5em]" />
                </AddToCardButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsItem>
  );
};

const ProductOfferCard = ({ item, className, variant = "grid" }) => {
  const { stocks } = item;

  return (
    <Tabs className="flex size-full flex-col" value={stocks?.[0]?._id || ""}>
      <TabsContent className="size-full flex-1">
        {stocks?.map((stock, index) => (
          <ProductOfferCardTab
            key={index}
            product={item}
            stock={stock}
            className={className}
            variant={variant}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ProductOfferCard;
