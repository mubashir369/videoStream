import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import MyVideos from "./component/MyVideos/MyVideos";
import PlayVideo from "./component/PlayVideo/PlayVideo";
import TreadingVideos from "./component/TreadingVideos/TreadingVideos";
import Upload from "./component/Upload/Upload";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SingUp/SignUpPage";

function App() {
  return (
    <div className="App">
     
      <Router>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signUp" element={<SignUpPage/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/playVideo/:id" element={<PlayVideo/>} />
          <Route path="/trend" element={<TreadingVideos/>} />
          <Route path="/myVideos" element={<MyVideos/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
