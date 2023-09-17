import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/SignIn";
import Root from "./routes/Root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
