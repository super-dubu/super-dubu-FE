import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { confirmPayment } from "../Toss/confirmPayments";

const TransSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [jsonData, setJsonData] = useState({});

  const requestData = {
    orderId: query.get("orderId"),
    amount: query.get("amount"),
    paymentKey: query.get("paymentKey"),
  };

  useEffect(() => {
    const confirm = async () => {
      try {
        console.log("Request Data: ", requestData);
        const { response, json } = await confirmPayment(requestData);
        console.log("Received response: ", response);
        console.log("Received json: ", json);
        setJsonData(json); // 받은 데이터를 상태에 저장
      } catch (e) {
        console.error("Error during confirmation: ", e);
      }
    };

    confirm();
  }, []); // []는 빈 의존성 배열로, 컴포넌트 마운트 시 한 번만 실행

  return (
    <div>
      <h1>결제 성공</h1>
      <p>결제 키: {query.get("paymentKey")}</p>
      <p>주문 ID: {query.get("orderId")}</p>
      <p>결제 금액: ₩{query.get("amount")}</p>
      <h2>응답 데이터</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default TransSuccess;
