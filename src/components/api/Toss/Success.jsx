import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { confirmPayment } from "../Toss/confirmPayments";
import axios from "axios";

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
        const updatedJson = { ...json, tokenID: "1159010200102140203" };
        console.log("Received response: ", response);
        console.log("Received json: ", json);
        setJsonData(updatedJson);

        await axios.post(
          `${import.meta.env.VITE_BACK_URL}/HLF/bank`,
          updatedJson
        );
        console.log("post 성공..", updatedJson);
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
