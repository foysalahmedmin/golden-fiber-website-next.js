import { StarRating } from "@/components/ui/StarRating";
import { urls } from "@/lib/base";
import { cn, toFixedAndLocaleStringCurrency } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCardButton from "../../Buttons/AddToCardButton";
import CartInfo from "../../CartInfo";

const Thumbnail = ({ image, name, className }) => {
  return (
    <div
      className={cn(
        "h-[15em] w-full overflow-hidden border-b bg-muted/25 p-[1em] shadow-inner dark:bg-background",
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

const ProductCard = ({ item, className, variant = "grid" }) => {
  const {
    _id,
    name,
    thumbnail,
    short_description,
    rating,
    totalReviews,
    originalPrice,
    price,
    tags,
  } = item;
  const image = urls?.product_thumbnail + "/" + thumbnail;
  return (
    <>
      {variant === "grid" && (
        <div
          className={cn(
            "group/card h-full self-stretch overflow-hidden rounded-md border text-[1rem] shadow",
            className,
          )}
        >
          <div className="flex size-full flex-col">
            <div className="relative w-full">
              <Link href={_id ? `/shop/${_id}` : "#"} className="size-full">
                <Thumbnail image={image} name={name} />
              </Link>
              {tags && tags?.length > 0 && <Tags tags={tags} />}
              <div className="absolute bottom-0 left-0 right-0 w-full py-[1em]">
                <CartInfo />
              </div>
            </div>
            <div className="flex grow flex-col space-y-[0.5em] bg-card px-[1em] py-[1em]">
              <Link
                href={_id ? `/shop/${_id}` : "#"}
                className="grid grow gap-[0.5em]"
              >
                <h3 className="text-[1em] leading-none text-title">{name}</h3>
                {short_description && (
                  <p className="text-[0.75em] leading-none text-foreground/75">
                    {short_description}
                  </p>
                )}
              </Link>
              {rating && (
                <RatingReviews rating={rating} totalReviews={totalReviews} />
              )}
              <div className="flex items-center justify-between gap-[0.5em]">
                <div></div>
                <Price
                  price={price}
                  originalPrice={originalPrice}
                  className="-right-[1em] ml-auto rounded-e-none"
                />
              </div>
              <div className="!mt-[1em]">
                <AddToCardButton
                  className="primary w-full rounded-md rounded-t-none text-[0.875em] uppercase hover:bg-primary/75 group-hover/card:bg-primary group-hover/card:text-primary-foreground"
                  variant="outline"
                  id={_id}
                >
                  <span>Add to Cart</span>{" "}
                  <ShoppingCart className="size-[1.5em]" />
                </AddToCardButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === "list" && (
        <div
          className={cn(
            "group/card h-full self-stretch overflow-hidden rounded-md border text-[1rem] shadow",
            className,
          )}
        >
          <div className="flex size-full">
            <div className="relative min-h-[12em] w-full min-w-[8em] flex-1 self-stretch">
              <Link href={_id ? `/shop/${_id}` : "#"} className="size-full">
                <Thumbnail image={image} name={name} />
              </Link>
              {tags && tags?.length > 0 && <Tags tags={tags} />}
              <div className="absolute bottom-0 left-0 right-0 w-full py-[1em]">
                <CartInfo />
              </div>
            </div>
            <div className="flex min-w-[13.5em] flex-1 flex-shrink-0 grow flex-col space-y-[0.5em] self-stretch bg-card px-[1em] py-[1em]">
              <Link
                href={_id ? `/shop/${_id}` : "#"}
                className="grid grow gap-[0.5em]"
              >
                <h3 className="text-[1em] leading-none text-title">{name}</h3>
                {short_description && (
                  <p className="text-[0.75em] leading-none text-foreground/75">
                    {short_description}
                  </p>
                )}
              </Link>
              {rating && (
                <RatingReviews rating={rating} totalReviews={totalReviews} />
              )}
              <div className="flex items-center justify-between gap-[0.5em]">
                <div></div>
                <Price
                  price={price}
                  originalPrice={originalPrice}
                  className="-right-[1em] ml-auto rounded-e-none"
                />
              </div>
              <div className="!mt-[1em]">
                <AddToCardButton
                  className="primary w-full rounded-md rounded-t-none text-[0.875em] uppercase hover:bg-primary/75 group-hover/card:bg-primary group-hover/card:text-primary-foreground"
                  variant="outline"
                  id={_id}
                >
                  <span>Add to Cart</span>{" "}
                  <ShoppingCart className="size-[1.5em]" />
                </AddToCardButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === "sidebar" && (
        <div
          className={cn(
            "group/card h-full self-stretch overflow-hidden rounded-md border text-[1rem] shadow",
            className,
          )}
        >
          <div
            href={_id ? `/shop/${_id}` : "#"}
            value={0}
            className="flex size-full"
          >
            <div className="relative min-h-[10em] w-full min-w-[8em] flex-1 self-stretch">
              <Link
                href={_id ? `/shop/${_id}` : "#"}
                className="block size-full"
              >
                <Thumbnail className="h-[10em]" image={image} name={name} />
              </Link>
              {tags && tags?.length > 0 && <Tags tags={tags} />}
              <div className="absolute bottom-0 left-0 right-0 w-full py-[1.5em] text-[0.75em]">
                <CartInfo />
              </div>
            </div>
            <div className="flex w-[13.5em] flex-1 flex-shrink-0 grow flex-col space-y-[0.5em] self-stretch bg-card px-[1em] py-[1em]">
              <Link
                href={_id ? `/shop/${_id}` : "#"}
                className="grid grow gap-[0.5em]"
              >
                <h3 className="text-[1em] leading-none text-title">{name}</h3>
                {short_description && (
                  <p className="text-[0.75em] leading-none text-foreground/75">
                    {short_description}
                  </p>
                )}
              </Link>
              {rating && (
                <RatingReviews
                  rating={rating}
                  totalReviews={totalReviews}
                  className="flex-col items-start"
                />
              )}
              <div className="flex flex-wrap items-center justify-between gap-[0.5em]">
                <div></div>
                <Price
                  price={price}
                  originalPrice={originalPrice}
                  className="ml-auto"
                />
              </div>
              <div className="!mt-[1em]">
                <AddToCardButton
                  className="primary h-[2.5em] w-full rounded-md rounded-t-none text-[0.875em] uppercase hover:bg-primary/75 group-hover/card:bg-primary group-hover/card:text-primary-foreground"
                  variant="outline"
                  id={_id}
                >
                  <span>Add to Cart</span>{" "}
                  <ShoppingCart className="size-[1em]" />
                </AddToCardButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
