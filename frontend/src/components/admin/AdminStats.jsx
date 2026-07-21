import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminApi";
import DashboardCard from "./DashboardCard";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalExperts: 0,
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data  = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Total Experts" value={stats.totalExperts} />
      <DashboardCard title="Total Bookings" value={stats.totalBookings} />
      <DashboardCard title="Pending" value={stats.pending} />
      <DashboardCard title="Confirmed" value={stats.confirmed} />
      <DashboardCard title="Completed" value={stats.completed} />
      <DashboardCard title="Cancelled" value={stats.cancelled} />
    </div>
  );
};

export default AdminStats;
