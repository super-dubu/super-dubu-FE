import { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import styled from "styled-components";

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
    <Background>
      <Wrapper>
        <PaymentContainer>
          <PaymentTitle>결제 방법</PaymentTitle>
          <div id="payment-method" className="w-100" />
          <div id="agreement" className="w-100" />
          <ButtonContainer>
            <PaymentButton
              onClick={async () => {
                try {
                  await widgets?.requestPayment({
                    orderId: generateRandomString(),
                    orderName: "안녕하세요",
                    customerName: "김덕환",
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
            </PaymentButton>
          </ButtonContainer>
        </PaymentContainer>
      </Wrapper>
    </Background>
  );
};

export default TossPayment;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PaymentTitle = styled.h2`
  text-align: center;
  color: #212222;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaymentButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #6d6e6a;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #212222;
  }
`;