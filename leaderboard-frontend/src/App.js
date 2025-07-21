import React, { useState } from "react";
import LeaderboardTabs from "./components/LeaderboardTabs";
import LeaderboardPodium from "./components/LeaderboardPodium";
import LeaderboardTable from "./components/LeaderboardTable";
import AddUserForm from "./components/AddUserForm";
import ClaimButton from "./components/ClaimButton";
import ClaimHistory from "./components/ClaimHistory";
import SettlementTimer from "./components/SettlementTimer";
import "./App.css";

// Subtab options per leaderboard tab, always keep Daily first!
const SUBTABS = {
  wealth: ["Daily", "Monthly"],
  live: ["Contribution", "Star tasks"],
  hourly: ["Hourly Live List", "Hourly Party List"],
  party: ["Weekly Contribution Ranking", "Weekly Charm Ranking"],
};
const TAB_COLORS = {
  wealth: "#FBE4C3",
  live: "#FFF4DB",
  hourly: "#EFDCF9",
  party: "#FFE7CC",
};

function App() {
  const [tab, setTab] = useState("wealth");
  const [subtab, setSubtab] = useState(SUBTABS["wealth"][0]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Settlement timers (can later fetch from backend)
  const settlementEnds = {
    wealth: Date.now() + 14 * 24 * 3600 * 1000 + 1 * 3600 * 1000 + 45 * 60 * 1000 + 47 * 1000,
    live: Date.now() + 2 * 24 * 3600 * 1000 + 1 * 3600 * 1000 + 45 * 60 * 1000 + 41 * 1000,
    hourly: Date.now() + 46 * 60 * 1000 + 34 * 1000,
    party: Date.now() + 2 * 24 * 3600 * 1000 + 1 * 3600 * 1000 + 45 * 60 * 1000 + 27 * 1000,
  };
  const currentBg = TAB_COLORS[tab] || "#fdf9ef";

  // On main tab change: always switch subtab to first in list
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setSubtab(SUBTABS[newTab][0]);
    setSelectedUser(null);
  };

  return (
    <div className="lb-root" style={{ background: currentBg }}>
      {/* Top tab bar */}
      <LeaderboardTabs active={tab} onChange={handleTabChange} />

      {/* Subtabs styled as a centered, pill-style toggle group */}
      <div className="lb-subtabs-bar" style={{
        display: "flex", justifyContent: "center", position: "relative", marginBottom: "0.9em"
      }}>
        <div className="lb-subtabs-inner" style={{
          display: "inline-flex",
          background: "#f4ede2",
          borderRadius: 20,
          padding: "5px 6px",
          boxShadow: "0 2px 13px #fae9df80",
        }}>
          {SUBTABS[tab].map((s) => (
            <button
              key={s}
              className={`lb-subtab-btn${subtab === s ? " active" : ""}`}
              style={{
                border: "none",
                outline: "none",
                background: subtab === s ? "#fffbe6" : "none",
                color: subtab === s ? "#df9f2c" : "#a2998e",
                fontWeight: subtab === s ? 700 : 600,
                fontSize: "1.09em",
                padding: "10px 34px",
                borderRadius: 15,
                margin: "0 2.5px",
                cursor: "pointer",
                boxShadow: subtab === s ? "0 1px 7px #ffd7003b" : "none",
                transition: "background 0.13s,color 0.12s",
              }}
              onClick={() => setSubtab(s)}
              tabIndex={0}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Rewards Button, top right of subtabs, never overlapping */}
        <button
          className="lb-reward-btn"
          style={{
            background: "none",
            border: "none",
            outline: "none",
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow: "none",
            cursor: "pointer",
          }}
          title="Rewards"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3531/3531755.png"
            alt="Rewards"
            height={38}
            style={{
              background: "#fffbe5",
              borderRadius: "50%",
              boxShadow: "0 2px 12px #ffdfb4",
              border: "2.2px solid #ffe6a0",
            }}
          />
        </button>
      </div>

      <SettlementTimer endTime={settlementEnds[tab]} />

      <LeaderboardPodium
        tab={tab}
        subtab={subtab}
        refresh={refresh}
        onSelect={setSelectedUser}
      />

      <div className="lb-controls">
        <AddUserForm onAdd={() => setRefresh((r) => !r)} />
        <ClaimButton userId={selectedUser} onClaim={() => setRefresh((r) => !r)} />
      </div>

      <LeaderboardTable
        tab={tab}
        subtab={subtab}
        selected={selectedUser}
        onSelect={setSelectedUser}
        refresh={refresh}
      />

      <ClaimHistory userId={selectedUser} refresh={refresh} />
    </div>
  );
}

export default App;
