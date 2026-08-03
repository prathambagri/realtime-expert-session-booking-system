import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAF8",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
            padding: "48px 40px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "24px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              🎯
            </div>

            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "28px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              ExpertBook
              <br />
              Admin Panel
            </h1>

            <p
              style={{
                margin: "0 0 40px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              Securely manage experts, bookings, users and platform analytics.
            </p>

            {[
              "Manage Experts",
              "Track Bookings",
              "Manage Users & Admins",
              "View Dashboard Analytics",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    flexShrink: 0,
                  }}
                >
                  ✔
                </span>
                <span
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔐</div>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "24px",
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              Welcome Back
            </h2>
            <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
              Sign in to continue to the admin dashboard.
            </p>
          </div>

          <SignIn
            routing="hash"
            forceRedirectUrl="/admin"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
