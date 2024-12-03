export async function confirmPayment(requestData) {
  const encryptedSecretKey = btoa(import.meta.env.VITE_SECRET_KEY);

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  );

  const json = await response.json();

  return { response, json };
}
