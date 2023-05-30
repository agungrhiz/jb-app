import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "@app/modules/pages";
import { Footer, Header } from "@app/modules/components/shared";

const PublicRoute = () => {
  return (
    <div>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </div>
  );
};

export default PublicRoute;
