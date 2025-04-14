
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import AdminChat from "./pages/AdminChat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin-chat" element={<AdminChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
