import "./App.css";
import MemberLogin from "./components/Member/MemberLogin.jsx";
import MemberMain from "./components/Member/MemberMain.jsx";
import MemberMypage from "./components/Member/MemberMypage.jsx";
import MemberJoin from "./components/Member/MemberJoin.jsx";
import UploadProperty from "./components/Member/UploadProperty.jsx";
import BookAdmin from "./components/Member/BookAdmin.jsx";
import ContractCheck from "./components/Member/ContractCheck.jsx";
import UploadAuth from "./components/Member/UploadAuth.jsx";
import PropAuth from "./components/api/PropAuth.jsx";

import TossPayment from "./components/api/Toss/TossPayment.jsx";
import SuccessPage from "./components/api/Toss/Success.jsx";
import FailPage from "./components/api/Toss/Fail.jsx";

import GuestLayout from "./components/Guest/GuestLayout.jsx";
import GuestMain from "./components/Guest/GuestMain.jsx";
import GuestSell from "./components/Guest/GuestSell.jsx";
import GuestBook from "./components/Guest/GuestBook.jsx";

import Contract1 from "./components/Member/Contract/Contract1.jsx";
import Contract2 from "./components/Member/Contract/Contract2.jsx";
import Contract3 from "./components/Member/Contract/Contract3.jsx";
import Contract4 from "./components/Member/Contract/Contract4.jsx";
import Contract5 from "./components/Member/Contract/Contract5.jsx";
import Contract6 from "./components/Member/Contract/Contract6.jsx";
import MobileAuth from "./components/api/MobileAuth.jsx";
import { ContractProvider } from "./components/api/ContractContext.jsx";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/api/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route path="/" element={<GuestMain />} />
            <Route path="sell" element={<GuestSell />} />
            <Route path="book" element={<GuestBook />} />
          </Route>
          <Route path="auth/:hashcode" element={<MobileAuth />} />
          <Route path="sandbox" element={<TossPayment />} />
          <Route path="sandbox/fail" element={<FailPage />} />
          <Route path="sandbox/success" element={<SuccessPage />} />

          <Route
            path="/member"
            element={
              <AuthProvider>
                <Outlet />
              </AuthProvider>
            }
          >
            <Route path="join" element={<MemberJoin />} />
            <Route path="login" element={<MemberLogin />} />

            <Route path="property" element={<UploadProperty />} />
            <Route path="uploadAuth" element={<UploadAuth />} />
            <Route path="propAuth/:hashcode" element={<PropAuth />} />

            <Route path="mypage" element={<MemberMypage />} />
            <Route path="" element={<MemberMain />} />
            <Route path="bookadmin" element={<BookAdmin />} />
            <Route path="check" element={<ContractCheck />} />

            <Route
              path="contract"
              element={
                <ContractProvider>
                  <Outlet />
                </ContractProvider>
              }
            >
              <Route path="1" element={<Contract1 />} />
              <Route path="2" element={<Contract2 />} />
              <Route path="3" element={<Contract3 />} />
              <Route path="4" element={<Contract4 />} />
              <Route path="5" element={<Contract5 />} />
              <Route path="6" element={<Contract6 />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
