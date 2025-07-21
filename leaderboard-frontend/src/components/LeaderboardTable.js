import React, { useEffect, useState } from "react";
import api from "../api";
import "./LeaderboardTable.css";

export default function LeaderboardTable({ tab, selected, onSelect, refresh }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, [tab, refresh]);

  return (
    <div className="lb-table-wrap">
      <table className="lb-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(3).map((u, i) => (
            <tr className={selected === u._id ? "selected" : ""} key={u._id}
                onClick={() => onSelect(u._id)}>
              <td>{i + 4}</td>
              <td>{u.name}</td>
              <td>{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
