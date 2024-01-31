import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import Admin from "./pages/admin";
import Dispatch from "./pages/dispatch";
import Production from "./pages/production";
import Receiving from "./pages/receiving";

//all server routes are defined on front end
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/dispatch" element={<Dispatch />} />
        <Route exact path="/production" element={<Production />} />
        <Route exact path="/receiving" element={<Receiving />} />
      </Routes>
    </div>
  );
}

export default App;
