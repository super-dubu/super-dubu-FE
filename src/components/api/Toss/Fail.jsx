import React from "react";
import { useLocation } from "react-router-dom";

const TransFail = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return (
    <div>
      <h1>결제 실패</h1>
      <p>사유: {query.get("message")}</p>
      <p>결제 키: {query.get("paymentKey")}</p>
      <p>주문 ID: {query.get("orderId")}</p>
    </div>
  );
};

export default TransFail;
