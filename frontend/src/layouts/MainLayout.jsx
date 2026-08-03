import { Outlet, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

export default function MainLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "rgba(250,250,248,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E2E8F0",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🎯
          </div>
          <span
            style={{
              color: "#0F172A",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "-0.3px",
            }}
          >
            ExpertBook
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/my-bookings"
            style={{
              color: "#64748B",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #E2E8F0",
              transition: "all 0.15s",
              background: "#fff",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#16A34A";
              e.target.style.borderColor = "#16A34A";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#64748B";
              e.target.style.borderColor = "#E2E8F0";
            }}
          >
            My Bookings
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                style={{
                  background: "#16A34A",
                  color: "#fff",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
