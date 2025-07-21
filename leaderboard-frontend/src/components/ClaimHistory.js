import React, { useEffect, useState } from "react";
import api from "../api";
import "./ClaimHistory.css";

const INITIAL_LIMIT = 10;
const LOAD_MORE_STEP = 10;

export default function ClaimHistory({ userId, refresh }) {
  const [history, setHistory] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(INITIAL_LIMIT);

  useEffect(() => {
    api
      .get(userId ? `/users/history/${userId}` : "/users/history")
      .then(res => {
        setHistory(res.data.slice().reverse());
        setDisplayLimit(INITIAL_LIMIT); // Reset limit on user/filter change
      });
  }, [userId, refresh]);

  const showMore = () => setDisplayLimit(lim => lim + LOAD_MORE_STEP);

  return (
    <div className="claim-history">
      <h4>Claim History</h4>
      <ul>
        {history.slice(0, displayLimit).map((h, i) => (
          <li key={i}>
            {h.userId.name} claimed {h.points} points on{" "}
            {new Date(h.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
      {displayLimit < history.length &&
        <button className="show-more-btn" onClick={showMore}>
          Show More
        </button>
      }
    </div>
  );
}
