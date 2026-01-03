import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("✅ Email Verified Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="relative w-full min-h-screen bg-purple-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
