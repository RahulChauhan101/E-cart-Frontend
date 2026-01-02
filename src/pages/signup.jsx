import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Frontend state (simple)
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("SUBMIT DATA 👉", formData); // ✅ DEBUG

    setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API RESPONSE 👉", res.data);

      toast.update(toastId, {
        render: res.data.message || "Signup successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/login");
    } catch (error) {
      console.error("API ERROR 👉", error);

      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          "Signup failed ❌ Please try again",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>

        {/* Login link */}
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">Already have an account? Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
