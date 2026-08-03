import AdminStats from "../../components/admin/AdminStats";

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          color: "#fff",
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
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-20px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "28px",
            fontWeight: "800",
            position: "relative",
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            position: "relative",
          }}
        >
          Monitor bookings, experts, and platform activity from one place.
        </p>
      </div>

      <AdminStats />
    </div>
  );
}
