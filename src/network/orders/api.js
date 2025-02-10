import { urls } from "@/lib/base";

export const addGuestOrder = async ({
  name,
  city,
  phone,
  address,
  email,
  sales_type,
  payment_method,
  gross_total,
  total,
  shipping_charge,
  orders,
}) => {
  const payload = {
    name,
    city,
    phone,
    address,
    email,
    sales_type,
    payment_method,
    gross_total,
    total,
    shipping_charge,
    orders,
  };

  try {
    const response = await fetch(`${urls.url}/api/sales/add_sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response?.json();
  } catch (error) {
    console.error("Error adding guest order:", error);
    throw error;
  }
};
