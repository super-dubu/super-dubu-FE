import React, { useEffect } from "react";

function Kmap({ items = [], onMarkerClick }) {
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

          const validItems = Array.isArray(items) ? items : [];
          const promises = validItems.map((item) => {
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

                  // 마커에 mouseover 이벤트 추가
                  kakao.maps.event.addListener(marker, "mouseover", () => {
                    infowindow.open(map, marker);
                  });

                  // 마커에 mouseout 이벤트 추가
                  kakao.maps.event.addListener(marker, "mouseout", () => {
                    infowindow.close();
                  });

                  // 마커 클릭 이벤트
                  kakao.maps.event.addListener(marker, "click", () => {
                    if (onMarkerClick) {
                      onMarkerClick(item); // 클릭한 아이템을 부모에 전달
                    }
                  });

                  bounds.extend(coords);
                  hasValidAddresses = true;
                }
                resolve();
              });
            });
          });

          Promise.all(promises).then(() => {
            if (hasValidAddresses) {
              map.setBounds(bounds);
            } else {
              map.setCenter(new kakao.maps.LatLng(37.5665, 126.978));
            }
          });
        });
      } catch (error) {
        console.error("Error loading Kakao Maps API:", error);
      }
    };

    initMap();
  }, [items, onMarkerClick]); // items가 변경될 때마다 실행

  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
