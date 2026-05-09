import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#F9FAFB" }}>
        <nav
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "20px", color: "#4F46E5" }}>
            🎯 Expert Booking
          </h1>
          <a
            href="/my-bookings"
            style={{
              color: "#4F46E5",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            My Bookings
          </a>
        </nav>

        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}
        >
          <Routes>
            <Route path="/" element={<ExpertList />} />
            <Route path="/experts/:id" element={<ExpertDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
