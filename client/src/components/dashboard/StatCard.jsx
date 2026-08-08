function StatCard({
  icon = "•",
  label = "",
  value = 0,
  description = "",
}) {
  return (
    <article className="dashboard-stat-card">
      <div
        className="dashboard-stat-icon"
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="dashboard-stat-content">
        <span>{label}</span>

        <strong>{value}</strong>

        <small>{description}</small>
      </div>
    </article>
  );
}

export default StatCard;