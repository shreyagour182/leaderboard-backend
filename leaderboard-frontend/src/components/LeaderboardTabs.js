import React from "react";
import "./Tabs.css";

const TABS = [
  { value: "wealth", label: "Wealth Ranking" },
  { value: "live", label: "Live Ranking" },
  { value: "hourly", label: "Hourly Ranking" },
  { value: "party", label: "Party Ranking" }
];

export default function LeaderboardTabs({ active, onChange }) {
  return (
    <div className="tabs-bar">
      {TABS.map(t => (
        <button
          className={active === t.value ? "tab-btn active" : "tab-btn"}
          onClick={() => onChange(t.value)}
          key={t.value}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
