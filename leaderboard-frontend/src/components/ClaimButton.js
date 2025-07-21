import React from "react";
import api from "../api";
import "./ClaimButton.css";
export default function ClaimButton({ userId, onClaim }) {
  const claim = async () => {
    if (!userId) return alert("Select a user first!");
    await api.post(`/claims/${userId}`);
    onClaim();
  };
  return (
    <button className="claim-btn" onClick={claim} disabled={!userId}>
      Claim Points
    </button>
  );
}