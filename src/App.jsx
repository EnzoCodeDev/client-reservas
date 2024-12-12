import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import { Rooms } from "./pages/rooms/Rooms";
import RoomSeparate from "./pages/room-separate/room-separate";
import Register from "./pages/register/Register"

function App() {
  return (
    <BrowserRouter basename='/client-reservas'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/rooms/:id_hotel" element={<Rooms/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/room-separate/:id" element={<RoomSeparate/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;