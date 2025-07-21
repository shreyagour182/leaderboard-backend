import React, { useEffect, useState } from "react";
import api from "../api";
import "./Podium.css";

// Utility for point icons based on leaderboard type
const getPointIcon = (tab) => {
  if (tab === "party")
    return "https://cdn-icons-png.flaticon.com/512/2583/2583346.png"; // Trophy
  if (tab === "hourly")
    return "https://cdn-icons-png.flaticon.com/128/1828/1828884.png"; // Fire
  if (tab === "live")
    return "https://cdn-icons-png.flaticon.com/128/3649/3649449.png"; // Flower
  return "https://cdn-icons-png.flaticon.com/512/616/616408.png"; // Coin
};

export default function LeaderboardPodium({ tab, refresh, onSelect }) {
  const [top, setTop] = useState([null, null, null]);

  useEffect(() => {
    api.get("/users").then(res => setTop([res.data[0], res.data[1], res.data[2]]));
  }, [tab, refresh]);

  const pointIcon = getPointIcon(tab);

  return (
    <div className="podium-flex">
      {/* Second place */}
      <div className="podium-card second" onClick={() => onSelect(top[1]?._id)}>
        <img
          src={top[1]?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt=""
          className="podium-avatar"
        />
        <div className="podium-badge medal silver">
          <span className="podium-number">2</span>
        </div>
        <div className="podium-user">{top[1]?.name || "—"}</div>
        <div className="podium-points">
          {top[1]?.totalPoints ?? "—"}
          <img src={pointIcon} alt="" className="pt-icon" />
        </div>
      </div>

      {/* First place */}
      <div className="podium-card first" onClick={() => onSelect(top[0]?._id)}>
        <div className="podium-wings">
          <img
            src="https://www.freepnglogos.com/uploads/trophy-png/trophy-with-golden-leaf-png-17.png"
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <img
          src={top[0]?.avatar || "https://www.pngall.com/wp-content/uploads/14/King-Crown-PNG-Pic.png"}
          alt=""
          className="podium-avatar first"
        />
        <div className="podium-badge gold-crown">
          <img
            src="https://www.pngall.com/wp-content/uploads/14/King-Crown-PNG-Pic.png"
            alt=""
            style={{ width: 30 }}
          />
          <span className="podium-number">1</span>
        </div>
        <div className="podium-user">{top[0]?.name || "—"}</div>
        <div className="podium-points">
          {top[0]?.totalPoints ?? "—"}
          <img src={pointIcon} alt="" className="pt-icon" />
        </div>
      </div>

      {/* Third place */}
      <div className="podium-card third" onClick={() => onSelect(top[2]?._id)}>
        <img
          src={top[2]?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt=""
          className="podium-avatar"
        />
        <div className="podium-badge medal bronze">
          <span className="podium-number">3</span>
        </div>
        <div className="podium-user">{top[2]?.name || "—"}</div>
        <div className="podium-points">
          {top[2]?.totalPoints ?? "—"}
          <img src={pointIcon} alt="" className="pt-icon" />
        </div>
      </div>
    </div>
  );
}
