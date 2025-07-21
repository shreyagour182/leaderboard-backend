import React, { useState, useEffect } from "react";

export default function SettlementTimer({ endTime }) {
  const [remaining, setRemaining] = useState(endTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(endTime - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  // Format as "14 days 01:45:47"
  const formatTime = ms => {
    if (ms < 0) return "00:00:00";
    const days = Math.floor(ms / (24 * 3600 * 1000));
    const h = String(Math.floor((ms / (3600 * 1000)) % 24)).padStart(2, "0");
    const m = String(Math.floor((ms / (60 * 1000)) % 60)).padStart(2, "0");
    const s = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    return `${days} days ${h}:${m}:${s}`;
  };

  return (
    <div className="settlement-timer" style={{
      textAlign: "center",
      fontWeight: 600,
      color: "#b59b66",
      margin: "0.7em 0 2em 0",
      fontSize: "1.08em"
    }}>
      Settlement time {formatTime(remaining)}
    </div>
  );
}
