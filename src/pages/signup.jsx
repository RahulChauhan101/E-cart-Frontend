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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handaleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      // 🔥 API call simulation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.update(toastId, {
        render: "Account created successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Signup failed ❌",
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
            Enter given details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  id="firstName"
                  name= "firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handaleChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handaleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handaleChange}
                placeholder=" Enter yor Email id"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handaleChange}
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

        <CardFooter>
          <Button variant="outline" className="w-full group">
  <span className="text-sm text-gray-600 group-hover:text-purple-800  transition">
    Already have an account?
    <Link
      to="/login"
className=" m-2 inline-block transform transition duration-200 hover:underline hover:scale-125"

    >
      Login
    </Link>
  </span>
</Button>


          
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
