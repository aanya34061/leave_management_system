const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));


let leaveHistory = [];

// Health check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running fine 🚀" });
});

// Apply Leave API
app.post("/api/leave/apply", (req, res) => {
  const { user, fromDate, toDate, reason } = req.body;
  if (!user || !fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "Missing fields ❌", status: "Error" });
  }
  const leave = { id: Date.now(), user, fromDate, toDate, reason, status: "Pending" };
  leaveHistory.push(leave);
  res.json({ message: "Leave Applied ✔", status: "Success", id: leave.id });
});

// Leave History API
app.get("/api/leave/history/:user", (req, res) => {
  const user = req.params.user;
  const history = leaveHistory.filter((l) => l.user === user);
  res.json({ status: "Success", history });
});

// Start server
app.listen(5001, () => console.log("Backend running on port 5001 🚀"));
