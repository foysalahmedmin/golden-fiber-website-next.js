import { urls } from "@/lib/base";

export const getAllProducts = async ({
  page,
  limit,
  search,
  parent_category,
  category,
  sub_category,
  today_deal,
  featured,
  sort,
} = {}) => {
  const endpoint = `${urls.url}/api/product/physical/get_products`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (search) params.append("search", search);
  if (parent_category) params.append("parent_category", parent_category);
  if (category) params.append("category", category);
  if (sub_category) params.append("sub_category", sub_category);
  if (today_deal) params.append("today_deal", true);
  if (featured) params.append("today_deal", true);
  if (sort) params.append("sort", sort);

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

  if (ids) params.append("ids", ids?.join(","));

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
