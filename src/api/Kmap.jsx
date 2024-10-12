import React, { useEffect } from "react";

const { kakao } = window;

function Kmap() {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.494640041856755, 126.95972035671491),
      level: 2,
    };
    const kakaomap = new kakao.maps.Map(container, options);
    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div id="map" style={{ flex: "1", width: "100%", height: "100%" }}></div>
  );
}

export default Kmap;
