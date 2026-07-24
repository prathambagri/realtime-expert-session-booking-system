const CARD_STYLES = {
  "Total Experts": {
    icon: "👨‍💼",
    bg: "from-violet-500 to-indigo-600",
    iconBg: "bg-violet-100",
  },
  "Total Bookings": {
    icon: "📅",
    bg: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100",
  },
  Pending: {
    icon: "⏳",
    bg: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
  },
  Confirmed: {
    icon: "✅",
    bg: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-100",
  },
  Completed: {
    icon: "🎉",
    bg: "from-indigo-500 to-violet-500",
    iconBg: "bg-indigo-100",
  },
  Cancelled: {
    icon: "❌",
    bg: "from-rose-500 to-red-500",
    iconBg: "bg-rose-100",
  },
};

const DashboardCard = ({ title, value }) => {
  const style = CARD_STYLES[title] || {
    icon: "📊",
    bg: "from-slate-500 to-slate-600",
    iconBg: "bg-slate-100",
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg ${style.iconBg} text-2xl`}
        >
          {style.icon}
        </div>

        <div className={`h-2 w-16 rounded-full bg-linear-to-r ${style.bg}`} />
      </div>

      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-extrabold text-slate-900">{value}</h2>
    </div>
  );
};

export default DashboardCard;
