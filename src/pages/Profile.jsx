import React, { useState, useEffect } from "react";
import { useSelector,  useDispatch } from "react-redux";
import { updateUser } from "@/redux/userSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { accessToken, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Prefill
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.FirstName || "",
        lastName: user.LastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        pinCode: user.zipcode || "",
      });

      if (user.profilepic) {
        setImagePreview(user.profilepic);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Image handler + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) return alert("Not logged in");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );

    if (profileImage) {
      data.append("profilepic", profileImage);
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Update failed");
        return;
      }

      dispatch(updateUser(result.user));
      console.log("updateuser fn:",updateUser);
      

      alert("Profile updated successfully ✅");
      console.log("UPDATED USER:", result.user);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
      <Tabs defaultValue="profile" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-2 bg-white shadow-md rounded-xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-white rounded-2xl p-8 mt-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

            {/* 🔹 Profile Image */}
            <div className="flex items-center gap-6 mb-8 ">

<div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 p-1 shadow-md">
  <div className="w-full h-full rounded-full bg-white overflow-hidden p-1">
    <img
      src={imagePreview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
      alt="profile"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>


              
              

              <div>
                <Label className="block mb-2">Change Profile Image</Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* 🔹 Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input value={formData.email} disabled />
              </div>

              <div>
                <Label>Phone</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div>
                <Label>Address</Label>
                <Input name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div>
                  <Label>Pin Code</Label>
                  <Input name="pinCode" value={formData.pinCode} onChange={handleChange} />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
