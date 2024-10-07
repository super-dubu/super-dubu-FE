import './App.css';
import MemberLogin from '../src/components/Member/MemberLogin.jsx'
import MemberMain from '../src/components/Member/MemberMain.jsx'
import MemberMypage from '../src/components/Member/MemberMypage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/member/login" element={<MemberLogin />}/>
        <Route path="/member/mypage" element={<MemberMypage />} />
        <Route path="/member/main" element={<MemberMain />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
