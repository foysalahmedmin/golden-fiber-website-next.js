import { StarRating } from "@/components/ui/StarRating";
import { cn, toFixedAndLocaleStringCurrency } from "@/lib/utils";
import ColorsList from "./ColorsList";
import ProductPurchase from "./ProductPurchase";

const ProductPs = ({ className, product, stock, isVariant }) => {
  const {
    name,
    short_description,
    originalPrice,
    rating,
    totalReviews,
    stocks,
  } = product;

  const { quantity: availableQuantity, selling_price, color } = stock || {};

  const getColors = (stocks = []) => {
    const uniqueColors = new Map();

    stocks.forEach((stock) => {
      const color = stock?.color;
      if (color?._id && !uniqueColors.has(color._id)) {
        uniqueColors.set(color._id, color);
      }
    });

    return [...uniqueColors.values()];
  };

  const colors = getColors(stocks);

  const inStock = availableQuantity && parseInt(availableQuantity) > 0;

  return (
    <>
      <div
        className={cn(
          "max-w-xl flex-1 space-y-6 self-stretch md:space-y-8 lg:w-4/12 xl:w-5/12",
          className,
        )}
      >
        <div className="space-y-2 md:space-y-4">
          <h2 className="text-3xl md:text-5xl">{name}</h2>
          <div className="flex divide-x-2">
            <div className="flex items-center gap-2 pr-4">
              <StarRating
                rating={rating}
                className="text-[1.5em] leading-none"
              />
              <span className="text-muted-foreground">
                ({totalReviews} Reviews)
              </span>
            </div>
            <div className="pl-4">
              {inStock ? (
                <span className="font-semibold text-green-500">In Stock</span>
              ) : (
                <span className="font-semibold text-red-500">
                  Not Available
                </span>
              )}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <strong className="text-xl font-semibold !leading-none text-title md:text-3xl">
              {toFixedAndLocaleStringCurrency({
                value: selling_price,
              })}{" "}
              BDT
            </strong>
            {originalPrice && (
              <del className="!leading-none text-muted-foreground line-through md:text-lg">
                {toFixedAndLocaleStringCurrency({
                  value: originalPrice,
                })}{" "}
                BDT
              </del>
            )}
          </div>
        </div>
        <div>
          <p>{short_description}</p>
        </div>
        <hr />
        {colors?.length > 0 && <ColorsList color={color} colors={colors} />}
        {isVariant && <hr />}
        <ProductPurchase product={product} />
      </div>
    </>
  );
};

export default ProductPs;
