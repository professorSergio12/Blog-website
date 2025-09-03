import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: data.password }),
      });

      const result = await res.json();
      console.log("Full API response:", result);
      if (result.success != true) {
        setMessage("Something went wrong");
      } else {
        setMessage("✅ Password changed successfully!");
        setTimeout(() => navigate("/sign-in"), 1500);
      }
    } catch (error) {
      setMessage("Server error, please try again!");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center"
      >
        <input
          type="email"
          value={email}
          readOnly
          className="border p-2 rounded w-64 bg-gray-100 cursor-not-allowed text-black"
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded w-64 text-black"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="border p-2 rounded w-64 text-black"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reset Password
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
