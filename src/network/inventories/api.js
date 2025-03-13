import { urls } from "@/lib/base";

export const getFilterColors = async ({ search } = {}) => {
  const endpoint = `${urls.url}/api/product/color/get_filter_colors`;

  // Build query parameters conditionally
  const params = new URLSearchParams();

  const urlWithQuery = `${endpoint}?${params?.toString()}`;
  try {
    const response = await fetch(urlWithQuery);

    if (!response.ok) {
      throw new Error(
        `Error fetching filter colors: ${response?.status} ${response?.statusText} at ${urlWithQuery}`,
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
