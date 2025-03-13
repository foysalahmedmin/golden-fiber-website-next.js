import { urls } from "@/lib/base";

export const getAllCategories = async ({ page, limit, search } = {}) => {
  const endpoint = `${urls.url}/api/category/get_category_list`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (search) params.set("search", search);

  const urlWithQuery = `${endpoint}?${params?.toString()}`;
  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching categories: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
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

export const getAllSubCategories = async ({
  page,
  limit,
  search,
  category,
} = {}) => {
  const endpoint = `${urls.url}/api/category/sub/get_sub_category_list`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (search) params.set("search", search);
  if (category) params.set("category", category);

  const urlWithQuery = `${endpoint}?${params?.toString()}`;
  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching sub-categories: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
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
