import { useState } from "react";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";
import { getUser } from "../../../utils/auth";
import "../EditStudent/EditStudent.css";

function Settings() {
  const toast = useToast();
  const user = getUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success(response.data.message || "Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-container">
      <h2>Settings</h2>

      <p style={{ marginBottom: 20, color: "#64748b" }}>
        Logged in as <strong>{user?.name}</strong> ({user?.email})
      </p>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={loading}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
