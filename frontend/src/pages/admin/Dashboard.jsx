import AdminStats from "../../components/admin/AdminStats";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="rounded-xl bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-500 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>

        <p className="mt-2 text-sm text-white/85">
          Monitor bookings, experts, and platform activity from one place.
        </p>
      </div>

      {/* Statistics */}
      <AdminStats />
    </div>
  );
}
