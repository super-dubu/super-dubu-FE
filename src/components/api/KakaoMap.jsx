import React, { useEffect } from "react";

function Kmap() {

  const apikey = import.meta.env.VITE_KMAP_API_KEY;
  useEffect(() => {
    const loadKakaoMap = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        console.log(apikey)
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
        script.onload = () => resolve(window.kakao);
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      const kakao = await loadKakaoMap();
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.494640041856755, 126.95972035671491),
          level: 2,
        };
        const map = new kakao.maps.Map(container, options); // eslint-disable-line no-unused-vars
      });
    };

    initMap();
  }, []);

  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
