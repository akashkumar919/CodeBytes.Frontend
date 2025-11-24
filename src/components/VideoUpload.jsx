
import { useState, useRef, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

export default function VideoUpload() {
  const { id } = useParams();
  const problemId = id;

  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const [videoInfo, setVideoInfo] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const [videoExists, setVideoExists] = useState(null); // NEW ✔
  const fileInputRef = useRef(null); // NEW ✔

  // 👉 Check if video already uploaded for this problem
  useEffect(() => {
      const checkVideo = async () => {
          try {
              const res = await axiosClient.get(`/video/check/${problemId}`);
              setVideoExists(res.data.exists);  // true/false
          } catch (err) {
              setVideoExists(false);
          }
      };
      checkVideo();
  }, [problemId]);

  const handleFileSelect = (file) => {
    setVideoFile(file);
    setUploadResult(null);

    const url = URL.createObjectURL(file);

    const tempVideo = document.createElement("video");
    tempVideo.src = url;

    tempVideo.onloadedmetadata = () => {
      setVideoInfo({
        name: file.name,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2),
        duration: tempVideo.duration.toFixed(2),
        resolution: `${tempVideo.videoWidth} x ${tempVideo.videoHeight}`,
        type: file.type,
      });

      URL.revokeObjectURL(url);
    };
  };

  const getSignature = async () => {
    const { data } = await axiosClient.get(`/video/getSignature/${problemId}`);
    return data;
  };

  const uploadToCloudinary = async (signatureData) => {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("api_key", signatureData.api_key);
    formData.append("timestamp", signatureData.timestamp);
    formData.append("public_id", signatureData.public_id);
    formData.append("signature", signatureData.signature);

    return await axios.post(signatureData.upload_url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (evt) => {
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      }
    });
  };

  const saveMetadata = async (cloudinaryRes) => {
    await axiosClient.post("/video/saveMetaData", {
      problemId,
      cloudinaryPublicId: cloudinaryRes.public_id,
      secureUrl: cloudinaryRes.secure_url,
      duration: cloudinaryRes.duration
    });
  };

  const handleUpload = async () => {
    if (!videoFile) return alert("Please select a video!");

    try {
      setUploading(true);

      const signature = await getSignature();
      const res = await uploadToCloudinary(signature);

      await saveMetadata(res.data);

      setUploadResult({
        url: res.data.secure_url,
        publicId: res.data.public_id,
        duration: res.data.duration,
        sizeMB: (videoFile.size / (1024 * 1024)).toFixed(2)
      });

      // RESET UI AFTER UPLOAD ✔
      setProgress(0);
      setVideoFile(null);
      setVideoInfo(null);
      fileInputRef.current.value = ""; // clear file input ✔

      setVideoExists(true); // uploaded, so exists ✔

      alert("Video uploaded successfully!");

    } catch (err) {
      console.error(err);
      alert("Video upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-[#141414] rounded-lg shadow-lg text-white max-w-xl mx-auto mt-20">

      {/* Heading + Status Icon ✔ */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold">Upload Video Solution</h2>

        {videoExists === null ? null : videoExists ? (
          <CheckCircle className="text-green-500" size={32} />
        ) : (
          <XCircle className="text-red-500" size={32} />
        )}
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef} // connected ✔
        type="file"
        accept="video/*"
        className="file-input file-input-bordered w-full mb-4"
        onChange={(e) => handleFileSelect(e.target.files[0])}
      />

      {videoInfo && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">📌 Video Details</h3>
          <p><b>Name:</b> {videoInfo.name}</p>
          <p><b>Size:</b> {videoInfo.sizeMB} MB</p>
          <p><b>Duration:</b> {videoInfo.duration} sec</p>
          <p><b>Resolution:</b> {videoInfo.resolution}</p>
          <p><b>Type:</b> {videoInfo.type}</p>
        </div>
      )}

      {uploading && (
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="btn btn-primary bg-blue-600 hover:bg-blue-500 w-full text-white font-semibold py-2 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>

      {uploadResult && (
        <div className="bg-gray-800 p-4 mt-5 rounded-lg break-all">  {/* break-all = wrap long text ✔ */}
          <h3 className="text-lg font-semibold mb-2">✅ Upload Successful</h3>

          <p>
            <b>Cloudinary URL:</b>
            <a href={uploadResult.url} target="_blank" className="text-blue-400 underline ml-1">
              Watch Video
            </a>
          </p>
          <p><b>Public ID:</b> {uploadResult.publicId}</p> {/* wrapped ✔ */}
          <p><b>Duration:</b> {uploadResult.duration} sec</p>
          <p><b>Size:</b> {uploadResult.sizeMB} MB</p>
        </div>
      )}
    </div>
  );
}
