import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("✅ OTP sent to your email!");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 1000);
      }
    } catch (err) {
      setMessage("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded w-64 text-black"
          value={formData.email}
          onChange={(e) => setFormData({ email: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
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
