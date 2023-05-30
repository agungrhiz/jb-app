import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "@app/modules/routers/PublicRoute";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<PublicRoute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
