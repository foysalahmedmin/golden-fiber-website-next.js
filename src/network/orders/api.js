export const addGuestOrder = async ({
  name,
  city,
  postal,
  phone,
  address,
  email,
  sub_total,
  total,
  shipping,
  sold_from,
  payment_method,
  items,
}) => {
  const payload = {
    name,
    city,
    postal,
    phone,
    address,
    email,
    sub_total,
    total,
    shipping,
    sold_from,
    payment_method,
    items,
  };

  try {
    const response = await fetch(`${urls.url}/api/order/add_guest_order`, {
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
