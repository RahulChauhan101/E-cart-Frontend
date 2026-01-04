import React, { useState } from "react";
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
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

if (res.data.success) {
  dispatch(
    loginSuccess({
      user: res.data.user,                 // ✅ object
      accessToken: res.data.accessToken,   // ✅ correct key
      refreshToken: res.data.refreshToken,
    })
  );

  toast.update(toastId, {
    render: "Login successful 🎉",
    type: "success",
    isLoading: false,
    autoClose: 2000,
  });

  navigate("/");
}
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Login failed ❌",
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-400"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link
              to="/signup"
              className="flex items-center justify-center gap-1"
            >
              <UserPlus size={16} />
              Signup
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
