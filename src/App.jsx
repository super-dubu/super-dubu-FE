import "./App.css";
import MemberLogin from "./components/Member/MemberLogin.jsx";
import MemberMain from "./components/Member/MemberMain.jsx";
import MemberMypage from "./components/Member/MemberMypage.jsx";
import MemberJoin from "./components/Member/MemberJoin.jsx";
import QRPage from "./components/api/QR.jsx";
import UploadProperty from "./components/Member/UploadProperty.jsx";

import GuestLayout from "./components/Guest/GuestLayout.jsx";
import GuestMain from "./components/Guest/GuestMain.jsx";
import GuestSell from "./components/Guest/GuestSell.jsx";
import GuestInfo from "./components/Guest/GuestInfo.jsx";
import GuestBook from "./components/Guest/GuestBook.jsx";

import Contract1 from './components/Member/Contract/Contract1.jsx';
import Contract2 from './components/Member/Contract/Contract2.jsx';
import Contract3 from './components/Member/Contract/Contract3.jsx';
import Contract4 from './components/Member/Contract/Contract4.jsx';
import Contract5 from './components/Member/Contract/Contract5.jsx'
import Contract6 from './components/Member/Contract/Contract6.jsx'

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/api/AuthContext"; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<GuestLayout />}>
              <Route path="/" element={<GuestMain />} />
              <Route path="sell" element={<GuestSell />} />
              <Route path="sell/:itemID" element={<GuestInfo />} />
              <Route path="book" element={<GuestBook />} />
              <Route path="QR" element={<QRPage />} />
            </Route>

            <Route path="/member" element={<AuthProvider><Outlet /></AuthProvider>}>
              <Route path="join" element={<MemberJoin />} />
              <Route path="login" element={<MemberLogin />} />
              <Route path="property" element={<UploadProperty />} />
              <Route path="mypage" element={<MemberMypage />} />
              <Route path="" element={<MemberMain />} />
              <Route path="contract1" element={<Contract1 />} />
              <Route path="contract2" element={<Contract2 />} />
              <Route path="contract3" element={<Contract3 />} />
              <Route path="contract4" element={<Contract4 />} />
              <Route path="contract5" element={<Contract5 />} />
              <Route path="contract6" element={<Contract6 />} />
            </Route>
          </Routes>
        </div>
       </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
