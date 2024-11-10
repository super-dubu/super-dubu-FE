import React, { useEffect } from "react";

function Kmap() {
  const apikey = import.meta.env.VITE_KMAP_API_KEY;

  useEffect(() => {
    const loadKakaoMap = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
          return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
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
            center: new kakao.maps.LatLng(37.494640041856755, 126.95972035671491),
            level: 2,
          };
          new kakao.maps.Map(container, options);
        });
      } catch (error) {
        console.error("Error loading Kakao Maps API:", error);
      }
    };

    initMap();
  }, []);

  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
