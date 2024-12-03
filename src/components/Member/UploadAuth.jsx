import React, { useEffect } from "react";
import axios from "axios";
import cryptoJs from "crypto-js";

const UploadAuth = () => {
  const generatedHash = cryptoJs
    .SHA256(itemLog.itemInfo.itemID + Date.now())
    .toString()
    .slice(2, 12);

  useEffect(() => {
    // 폴링으로 인증 상태 확인
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/hlf/verifyauth`,
          {
            params: {
              qrID: generatedHash,
            },
          }
        );
        if (response?.status === 200) {
          setIsVerified(true);
          clearInterval(interval); // 폴링 중지
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
      }
    }, 3000); // 3초마다 확인

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 폴링 중지
  }, []);
};

export default UploadAuth;
