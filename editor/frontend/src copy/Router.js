import { Routes, Route } from "react-router-dom";
import IndexPage from "./index";

function Router() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </main>
  );
}

export default Router;
