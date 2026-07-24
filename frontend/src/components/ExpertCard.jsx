import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  Design: { bg: "#EDE9FE", color: "#5B21B6" },
  Engineering: { bg: "#DBEAFE", color: "#1E40AF" },
  Marketing: { bg: "#D1FAE5", color: "#065F46" },
  Finance: { bg: "#FEF3C7", color: "#92400E" },
};

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();
  const catColor = CATEGORY_COLORS[expert.category] || {
    bg: "#F3F4F6",
    color: "#374151",
  };
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      onClick={() => navigate(`/experts/${expert._id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

      {/* Header */}
      <div className="mb-5 flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 text-lg font-bold text-white shadow-md">
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="text-lg font-bold text-slate-900">{expert.name}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: catColor.bg,
                color: catColor.color,
              }}
            >
              {expert.category}
            </span>
            <span className="text-xs text-slate-500">
              {expert.experience} yrs experience
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
          ⭐ {expert.rating}
        </div>
      </div>

      {/* Bio */}
      <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-600">
        {expert.bio}
      </p>

      {/* Button */}
      <button className="w-full rounded-xl bg-gradient-to-r bg-indigo-600 hover:bg-indigo-700 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg">
        View Profile
      </button>
    </div>
  );
};

export default ExpertCard;
