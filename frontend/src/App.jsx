import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#F3F4F6" }}>
        {/* Navbar */}
        <nav
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
            boxShadow: "0 2px 12px rgba(79,70,229,0.3)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "22px" }}>🎯</span>
            <span
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "-0.3px",
              }}
            >
              ExpertBook
            </span>
          </a>
          <a
            href="/my-bookings"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "13px",
              background: "rgba(255,255,255,0.15)",
              padding: "7px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            My Bookings
          </a>
        </nav>

        {/* Page Content */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "24px 16px",
          }}
        >
          <Routes>
            <Route path="/" element={<ExpertList />} />
            <Route path="/experts/:id" element={<ExpertDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
