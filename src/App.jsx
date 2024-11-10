import "./App.css";
import MemberLogin from "./components/Member/MemberLogin.jsx";
import MemberMain from "./components/Member/MemberMain.jsx";
import MemberMypage from "./components/Member/MemberMypage.jsx";
import MemberJoin from "./components/Member/MemberJoin.jsx"
import UploadProperty from "./components/Member/UploadProperty.jsx";
import QRPage from "./api/QR.jsx";

import GuestLayout from "./components/Guest/GuestLayout.jsx";
import GuestMain from "./components/Guest/GuestMain.jsx";
import GuestSell from "./components/Guest/GuestSell.jsx";
import GuestBook from "./components/Guest/GuestBook.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route path="/" element={<GuestMain />} />
            <Route path="sell" element={<GuestSell />} />
            <Route path="book" element={<GuestBook />} />
            <Route path="QR" element={<QRPage />} />
          </Route>
          <Route path="/member/property" element = {< UploadProperty/>} />
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/mypage" element={<MemberMypage />} />
          <Route path="/member/join" element ={<MemberJoin />} />
          <Route path="/member" element={<MemberMain />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
