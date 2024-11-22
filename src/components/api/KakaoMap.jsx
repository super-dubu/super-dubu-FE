import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Kmap({ items = [] }) {
  const apikey = import.meta.env.VITE_KMAP_API_KEY;
  const navigate = useNavigate();

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
        script.onerror = () =>
          reject(new Error("Failed to load Kakao Maps API"));
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
            center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 중심 좌표 (서울시청)
            level: 3, // 확대 수준
          };
          const map = new kakao.maps.Map(container, options);

          const bounds = new kakao.maps.LatLngBounds(); // 지도 영역 객체 생성
          const geocoder = new kakao.maps.services.Geocoder();

          let hasValidAddresses = false;
          const promises = items?.map((item) => {
            return new Promise((resolve) => {
              geocoder.addressSearch(item.buildingAddress, (result, status) => {
                if (
                  status === kakao.maps.services.Status.OK &&
                  result.length > 0
                ) {
                  const coords = new kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                  );

                  const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                  });

                  const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${item.buildingAddress}</div>`,
                  });

                  kakao.maps.event.addListener(marker, "click", () => {
                    infowindow.open(map, marker);
                    navigate(`/sell/:${item.tokenID}`, {
                      replace: false,
                      state: { items: item },
                    });
                  });

                  bounds.extend(coords);
                  hasValidAddresses = true; // 유효한 주소가 있음을 표시
                } else {
                  console.error(
                    `Failed to geocode address: ${item.buildingAddress}`
                  );
                }
                resolve();
              });
            });
          });

          // 모든 addressSearch 완료 후 bounds 설정
          Promise.all(promises).then(() => {
            if (hasValidAddresses) {
              map.setBounds(bounds); // 모든 마커를 포함하는 영역으로 지도 설정
            } else {
              console.warn("No valid addresses found. Keeping default center.");
              map.setCenter(new kakao.maps.LatLng(37.5665, 126.978)); // 기본 중심 좌표
            }
          });
        });
      } catch (error) {
        console.error("Error loading Kakao Maps API:", error);
      }
    };

    initMap();
  }, [items]);

  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
