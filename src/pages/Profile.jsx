import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const accessToken = useSelector((state) => state.user?.accessToken);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");


  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });
const handleImage = (e) => {
  const file = e.target.files[0];
  console.log("SELECTED FILE 👉", file);
  setImage(file);
  setPreview(URL.createObjectURL(file));
};



const uploadProfilePic = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append("profilepic", image);

  try {
    const res = await axios.patch(
      "http://localhost:5000/api/users/profile-pic",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      setUser(res.data.user);
      setPreview("");
    }
  } catch (error) {
    console.error("Profile pic error:", error.response?.data);
  }
};

  /* =====================
     GET PROFILE
  ===================== */
  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.user);
          setFormData({
            phoneNumber: res.data.user.phoneNumber || "",
            address: res.data.user.address || "",
            city: res.data.user.city || "",
            country: res.data.user.country || "",
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  /* =====================
     INPUT CHANGE
  ===================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================
     UPDATE PROFILE
  ===================== */
  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setEdit(false);
      }
    } catch (error) {
      console.error("Profile update error:", error.response?.data);
    }
  };

  /* =====================
     UI STATES
  ===================== */
  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!accessToken)
    return <div className="p-6 text-red-500">User not logged in</div>;
  if (!user) return <div className="p-6">No profile data</div>;

  /* =====================
     UI
  ===================== */
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-600">
            My Profile
          </h2>

          <button
            onClick={() => setEdit(!edit)}
            className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
  <img
    src={preview || user.profilepic || "/avatar.png"}
    alt="profile"
    className="w-28 h-28 rounded-full object-cover border-4 border-purple-400"
  />

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="mt-3 text-sm"
  />

  {preview && (
    <button
      onClick={uploadProfilePic}
      className="mt-2 px-4 py-1 bg-purple-500 text-white rounded"
    >
      Upload
    </button>
  )}
</div>


        {/* VIEW MODE */}
        {!edit && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <ProfileItem label="First Name" value={user.FirstName} />
            <ProfileItem label="Last Name" value={user.LastName} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Role" value={user.role} />
            <ProfileItem
              label="Verified"
              value={user.isverified ? "Yes" : "No"}
            />
            <ProfileItem
              label="Phone"
              value={user.phoneNumber || "Not Added"}
            />
            <ProfileItem
              label="City"
              value={user.city || "Not Added"}
            />
            <ProfileItem
              label="Country"
              value={user.country || "Not Added"}
            />
            <div className="md:col-span-2">
              <ProfileItem
                label="Address"
                value={user.address || "Not Added"}
              />
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {edit && (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <button
              onClick={updateProfile}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =====================
   SMALL COMPONENTS
===================== */
const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  </div>
);

export default Profile;
