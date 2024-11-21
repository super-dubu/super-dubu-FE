import { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = import.meta.env.VITE_CLIENT_KEY;
const customerKey = import.meta.env.VITE_CUSTOM_KEY;

const TossPayment = () => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50000,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                await widgets?.requestPayment({
                  orderId: generateRandomString(),
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  successUrl:
                    window.location.origin +
                    "/sandbox/success" +
                    window.location.search,
                  failUrl:
                    window.location.origin +
                    "/sandbox/fail" +
                    window.location.search,
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TossPayment;
