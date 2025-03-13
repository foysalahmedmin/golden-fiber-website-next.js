import { urls } from "@/lib/base";

export const getAllProducts = async ({
  page,
  limit,
  search,
  category,
  sub_category,
  price_min,
  price_max,
  date_from,
  date_to,
  is_today_deal,
  is_featured,
  colors,
  sort,
} = {}) => {
  const endpoint = `${urls.url}/api/product/physical/get_products`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (sub_category) params.set("sub_category", sub_category);
  if (colors) params.set("colors", colors);
  if (price_min) params.set("price_min", price_min);
  if (price_max) params.set("price_max", price_max);
  if (date_from) params.set("date_from", date_from);
  if (date_to) params.set("date_to", date_to);
  if (is_today_deal) params.set("is_today_deal", true);
  if (is_featured) params.set("is_today_deal", true);
  if (sort) params.set("sort", sort);

  const urlWithQuery = `${endpoint}?${params.toString()}`;
  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching products: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
      );
    }

    const data = await response.json();

    return data[0];
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
};

export const getProductDetails = async (id) => {
  const endpoint = `${urls.url}/api/product/physical/get_product/${id}`;

  const urlWithQuery = `${endpoint}`;

  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching products: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
      );
    }

    const data = await response.json();

    return data[0];
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
};

export const getCartProducts = async ({ ids = [] } = {}) => {
  const endpoint = `${urls.url}/api/product/physical/get_cart_products`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  if (ids) params.set("ids", ids?.join(","));

  const urlWithQuery = `${endpoint}?${params.toString()}`;
  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching products: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
};
