import DirectiveTankTierlist from "./components/DirectiveTankTierlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DirectiveTankTierlist />} />
          <Route path="/hello" element={"Hello"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
