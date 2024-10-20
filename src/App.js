import "./App.css";
import MemberLogin from "../src/components/Member/MemberLogin.jsx";
import MemberMain from "../src/components/Member/MemberMain.jsx";
import MemberMypage from "../src/components/Member/MemberMypage.jsx";
import QRPage from "../src/api/QR.jsx";

import GuestLayout from "../src/components/Guest/GuestLayout.jsx";
import GuestMain from "../src/components/Guest/GuestMain.jsx";
import GuestSell from "../src/components/Guest/GuestSell.jsx";
import GuestBook from "../src/components/Guest/GuestBook.jsx";
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
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/mypage" element={<MemberMypage />} />
          <Route path="/member" element={<MemberMain />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
