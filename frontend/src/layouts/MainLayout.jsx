import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
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
          }}
        >
          My Bookings
        </a>
      </nav>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
