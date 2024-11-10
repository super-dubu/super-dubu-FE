import React, { useEffect } from "react";

function Kmap({ addresses = []}) {
  const apikey = import.meta.env.VITE_KMAP_API_KEY;

  useEffect(() => {
    const loadKakaoMap = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
          return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&libraries=services&autoload=false`;
        script.onload = () => resolve(window.kakao);
        script.onerror = () => reject(new Error("Failed to load Kakao Maps API"));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        const kakao = await loadKakaoMap();
        kakao.maps.load(() => {
          const container = document.getElementById("map");
          if (!container) return;

          const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 기본 중심 좌표 (서울시청)
            level: 3, // 확대 수준
          };
          const map = new kakao.maps.Map(container, options);

          // const geocoder = new kakao.maps.services.Geocoder();

          // addresses.forEach((address) => {
          //   // 지번 주소로 검색
          //   geocoder.addressSearch(address, (result, status) => {
          //     if (status === kakao.maps.services.Status.OK && result.length > 0) {
          //       const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          //       // 마커 생성
          //       const marker = new kakao.maps.Marker({
          //         map: map,
          //         position: coords,
          //       });

          //       // 지도 중심을 첫 번째 마커의 위치로 설정
          //       map.setCenter(coords);
          //     } else {
          //       // 지번 주소 변환 실패 시 처리
          //       console.error(`Failed to geocode address: ${address}`);
          //     }
          //   });
          // });
        });
      } catch (error) {
        console.error("Error loading Kakao Maps API:", error);
      }
    };

    initMap();
  }, [addresses]);

  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
