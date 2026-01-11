import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  // ✅ FORM STATE (backend-ready)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "rahul@email.com",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // ✅ INPUT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ IMAGE CHANGE HANDLER
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // ✅ SUBMIT (backend later)
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("phone", formData.phone);
  data.append("address", formData.address);
  data.append("city", formData.city);
  data.append("pinCode", formData.pinCode);

  if (profileImage) {
    data.append("file", profileImage);
  }

  try {
const res = await fetch(
  "http://localhost:5000/api/users/update-profile",
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  }
);


    const result = await res.json();
    console.log(result);
    alert("Profile updated successfully");
  } catch (error) {
    console.error(error);
  }
};


  return (

    
    <div className="pt-20 max-h-full bg-gray-100">
      <Tabs defaultValue="profile" className="w-full max-w-7xl mx-auto">

        {/* Tabs Header */}
        <div className="flex justify-center ">
          <TabsList className="grid grid-cols-2 bg-white shadow-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </div>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <div className="flex flex-col items-center bg-pink-200 border rounded-3xl pb-3">
            <h1 className="font-bold mb-3 mt-3 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-3xl">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img
                  src="/istockphoto-1324380506-2048x2048.jpg"
                  alt="profile"
                  className="h-32 rounded-full object-cover border-4 border-pink-500 p-1"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Change picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </Label>
              </div>

              {/* Profile Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-6 rounded-lg bg-white w-full"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Rahul"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Chauhan"
                    />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={formData.email} disabled />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your Contact Number"
                  />
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your Address"
                  />
                </div>

                <div>
                  <Label>City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your City"
                  />
                </div>

                <div>
                  <Label>Pin Code</Label>
                  <Input
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="Enter your Pin Code"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-pink-700 hover:bg-pink-800"
                >
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Your recent orders will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                No orders found.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Profile;
