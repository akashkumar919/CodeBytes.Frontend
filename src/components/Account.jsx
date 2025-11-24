

import { Calendar,Camera, ExternalLink, Mail, SquarePen, CircleUserRound, BookOpen } from "lucide-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../utils/axiosClient";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { updateUser } from "../authSlice";

export default function Account() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("basic");
  const [openField, setOpenField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---- PHOTO STATE ----
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  // → When user clicks on photo  
  const openPhotoPopup = () => {
    setShowPhotoPopup(true);
    setPreview(null);
    setFile(null);
  };

  // → Select Image  
  const handleFileSelect = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // → Step 1: get signature  
  const getSignature = async () => {
    const { data } = await axiosClient.get("/user/getImageSignature");
    return data;
  };

  // → Step 2: Upload to Cloudinary  
  const uploadToCloudinary = async (sig) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sig.api_key);
    formData.append("timestamp", sig.timestamp);
    formData.append("public_id", sig.public_id);
    formData.append("signature", sig.signature);

    return await axios.post(sig.upload_url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (evt) => {
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      }
    });
  };

  // → Step 3: Save metadata  
  const saveMetadata = async (cloudRes) => {
    return axiosClient.post("/user/saveImageMetaData", {
      cloudinaryPublicId: cloudRes.public_id,
      secureUrl: cloudRes.secure_url
    });
  };

  // → Upload function  
  const handleUploadPhoto = async () => {
    if (!file) return toast.error("Please select an image");

    try {
      setUploading(true);

      const signature = await getSignature();

      const cloudRes = await uploadToCloudinary(signature);

      const meta = await saveMetadata(cloudRes.data);

      dispatch(updateUser({ ...user, photo: meta.data.url }));

      toast.success("Profile photo updated!");

      closePhotoPopup();

    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const closePhotoPopup = () => {
    setShowPhotoPopup(false);
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // ---------------- OPEN EDIT MODAL ----------------
  const openEditModal = (field, currentValue) => {
    setOpenField(field);
    setFieldValue(Array.isArray(currentValue) ? currentValue.join(", ") : currentValue || "");
  };

  // ---------------- UPDATE FIELD ----------------
  const handleUpdate = async () => {
    try {
      let updatedValue = fieldValue;

      if (openField === "skills" || openField === "language") {
        updatedValue = fieldValue.split(",").map((item) => item.trim());
      }

      const res = await axiosClient.put("/user/update", {
        userId: user?._id,
        [openField]: updatedValue
      });

      dispatch(updateUser(res.data.user));
      toast.success("Updated Successfully!");

      setOpenField(null);
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  // ---------------- DELETE ACCOUNT ----------------
  const handleDeleteAccount = async () => {
    const confirmText = prompt("Type DELETE to confirm:");
    if (confirmText !== "DELETE") return toast.error("Cancelled");

    const ans = await axiosClient.delete(`/user/deleteUser/${user?._id}`);
    toast.success(ans.data?.message || "Account deleted!");
  };

  return (
    <div className="min-h-screen p-4 mt-15 md:p-6 flex flex-col md:flex-row gap-4 bg-[#1a1a1a]">

      {/* ---------------- SIDEBAR ---------------- */}
      <div className="bg-[#323232] w-full md:w-[25%] rounded-2xl shadow-xl p-4 text-white">
        <ul className="flex md:flex-col justify-around md:justify-start gap-3">
          <li
            onClick={() => setActiveTab("basic")}
            className={`flex gap-2 p-3 cursor-pointer rounded-xl transition-all 
            ${activeTab === "basic" ? "bg-[#ff6200] font-semibold" : "hover:bg-[#3f3f3f]"}`}
          >
            <BookOpen /> Basic Info
          </li>

          <li
            onClick={() => setActiveTab("account")}
            className={`flex gap-2 p-3 cursor-pointer rounded-xl transition-all 
            ${activeTab === "account" ? "bg-[#ff6200] font-semibold" : "hover:bg-[#3f3f3f]"}`}
          >
            <CircleUserRound /> Account
          </li>
        </ul>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="flex-1 flex flex-col gap-4">

        {/* PROFILE HEADER */}
        <div className="bg-[#323232] rounded-2xl p-4 w-full flex gap-8 items-center text-white">
          <div className="relative">
          <img
             onClick={openPhotoPopup}
             src={user?.photo ? user.photo : "/src/assets/anonymous.png"}
            className="h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover hover:opacity-70 cursor-pointer"
          />
          {/* <SquarePen onClick={openPhotoPopup}
                className="absolute -top-1 -right-1 text-orange-500 cursor-pointer"
                size={20}
          /> */}
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <h1 className="text-md md:text-2xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h1>
              <ExternalLink
                onClick={() => navigate(`/user/dashboard/${user?._id}`)}
                className="text-blue-500 cursor-pointer"
              />
            </div>

            <span className="text-gray-400 flex gap-2 mt-1 items-center">
              <Mail size={15} /> {user?.email}
            </span>

            <span className="text-gray-400 flex gap-2 mt-1 items-center">
              <Calendar size={15} />
              {new Date(user?.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>

        {/* ---------------- TAB CONTENT ---------------- */}
        <div className="bg-[#323232] rounded-2xl p-4 text-white md:p-10">

          {/* BASIC INFO */}
          {activeTab === "basic" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#ff6200]">Basic Information</h2>

              <div className="space-y-3 text-gray-300">

                <InfoRow label="First Name" value={user?.firstName || 'Not set'}
                  onEdit={() => openEditModal("firstName", user?.firstName)} />

                <InfoRow label="Last Name" value={user?.lastName || 'Not set'}
                  onEdit={() => openEditModal("lastName", user?.lastName)} />

                <InfoRow label="Age" value={user?.age || "Not set"}
                  onEdit={() => openEditModal("age", user?.age)} />

                <InfoRow label="City" value={user?.city || "Not set"}
                  onEdit={() => openEditModal("city", user?.city)} />

                <InfoRow label="Country" value={user?.country || "Not set"}
                  onEdit={() => openEditModal("country", user?.country)} />

                <InfoRow label="College" value={user?.college || "Not set"}
                  onEdit={() => openEditModal("college", user?.college)} />

              </div>
            </div>
          )}

          {/* ACCOUNT INFO */}
          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#ff6200]">Account Details</h2>

              <div className="space-y-3 text-gray-300">

                <InfoRowNoEdit label="Email" value={user?.email} />

                <InfoRow label="GitHub ID" value={user?.githubId || "Not set"}
                  onEdit={() => openEditModal("githubId", user?.githubId)} />

                <InfoRow label="LinkedIn ID" value={user?.linkedInId || "Not set"}
                  onEdit={() => openEditModal("linkedInId", user?.linkedInId)} />

                <InfoRow label="Skills" value={user?.skills?.join(", ") || "Not set"}
                  onEdit={() => openEditModal("skills", user?.skills)} />

                <InfoRow label="Languages" value={user?.language?.join(", ") || "Not set"}
                  onEdit={() => openEditModal("language", user?.language)} />

                <button
                  className="mt-6 bg-[#ff6200] px-4 py-2 rounded-xl hover:bg-orange-700"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- PHOTO UPLOAD POPUP ---------------- */}
      {showPhotoPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#222222] p-6 rounded-xl w-[90%] md:w-[400px] text-white">

            <h2 className="text-xl font-semibold mb-4 text-[#ff6200]">Update Profile Photo</h2>

            {preview && (
              <img
                src={preview}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover border"
              />
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full p-2 rounded-lg bg-[#333] mb-4"
            />

            {uploading && (
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-500 h-3"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-500 rounded-lg" onClick={closePhotoPopup}>
                Cancel
              </button>

              <button
                onClick={handleUploadPhoto}
                disabled={uploading}
                className="px-4 py-2 bg-[#ff6200] rounded-lg"
              >
                {uploading ? "Uploading..." : "Save Photo"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {openField && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#2d2d2d] p-6 rounded-xl w-[90%] md:w-[400px] text-white">

            <h2 className="text-xl font-semibold mb-4 capitalize text-[#ff6200]">
              Edit {openField}
            </h2>

            <input
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#3a3a3a] outline-none"
              placeholder="Enter value"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-500 rounded-lg" onClick={() => setOpenField(null)}>
                Cancel
              </button>

              <button className="px-4 py-2 bg-[#ff6200] rounded-lg" onClick={handleUpdate}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// -------- HELPER SMALL COMPONENTS -----------

function InfoRow({ label, value, onEdit }) {
  return (
    <p>
      <span className="font-semibold text-white">{label}: </span> {value}
      <SquarePen size={16} className="inline ml-2 cursor-pointer text-[#ff6200]" onClick={onEdit} />
    </p>
  );
}

function InfoRowNoEdit({ label, value }) {
  return (
    <p>
      <span className="font-semibold text-white">{label}: </span> {value}
    </p>
  );
}
