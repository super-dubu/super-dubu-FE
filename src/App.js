import "./App.css";
import MemberLogin from "../src/components/Member/MemberLogin.jsx";
import MemberMain from "../src/components/Member/MemberMain.jsx";
import MemberMypage from "../src/components/Member/MemberMypage.jsx";

import GuestLayout from "../src/components/Guest/GuestLayout.jsx";
import GuestMain from "../src/components/Guest/GuestMain.jsx";
import GuestSell from "../src/components/Guest/GuestSell.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/guest" element={<GuestLayout />}>
            <Route path="main" element={<GuestMain />} />
            <Route path="sell" element={<GuestSell />} />
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
