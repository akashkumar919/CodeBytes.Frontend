

import { Eye, CalendarDays, BadgeCheck } from "lucide-react";

import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";

export default function VideoPlayer({ videoUrl , problem}) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState("auto");

  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(videoUrl?.duration || 0);

  /** AUTO HIDE CONTROLS AFTER 1 SEC WHEN PLAYING */
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => setShowControls(false), 1000);
    return () => clearTimeout(timer);
  }, [isPlaying, currentTime]);

  /** SHOW CONTROLS ON MOUSE MOVE */
  const handleMouseMove = () => {
    setShowControls(true);
  };

  /** TIME UPDATE + END VIDEO FIX */
  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;

    setCurrentTime(time);

    if (time >= duration - 0.1) {
      setCurrentTime(duration);
      setIsPlaying(false); // end → show PLAY ICON
      setShowControls(true);
    }
  };

  /** CLICK ON VIDEO → TOGGLE PLAY/PAUSE */
  const handleVideoClick = () => {
    togglePlay();
  };

  /** SEEK */
  const handleSeek = (e) => {
    const t = Number(e.target.value);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  /** VOLUME */
  const handleVolume = (e) => {
    const v = e.target.value;
    setVolume(v);
    videoRef.current.volume = v;
  };

  /** MUTE */
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  /** PLAY / PAUSE */
  const togglePlay = () => {
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();

    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  /** SPEED */
  const changeSpeed = (sp) => {
    setSpeed(sp);
    videoRef.current.playbackRate = sp;
  };

  /** QUALITY */
  const getQualityUrl = () => {
    const url = videoUrl?.secureUrl;
    if (!url || typeof url !== "string") return "";
    if (!url.includes("cloudinary")) return url;

    return url.replace("/upload/", `/upload/q_${quality}/`);
  };

  /** FULLSCREEN */
  const goFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (

<div>
    {/* PROBLEM TITLE  */}
    <h1 className="text-2xl font-bold text-white mb-2" >{problem.title}</h1>

     {/* PROFILE SHOW  */}
    <div className="flex items-center gap-4 w-fit">

      {/* Logo */}
      <img
        src="/src/assets/code_bytes.png" 
        alt="Logo"
        className="w-9 h-9 rounded-full "
      />

      <div className="flex flex-col justify-center">
        
        {/* Name + Verified Badge */}
        <div className="flex items-center gap-1">
          <h1 className="text-white font-semibold text-sm">CodeBytes</h1>

          {/* Blue Tick */}
          <span className="text-blue-500 ">
            <BadgeCheck size={14} strokeWidth={3} />
          </span>
        </div>

        {/* Views + Date */}
        <div className="flex items-center text-gray-400 text-sm gap-4">

          {/* Views */}
          <div className="flex items-center gap-1 text-gray-500">
            <Eye size={16} />
            <span>891681</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-gray-500">
            <CalendarDays size={14} />
            <span>{new Date(videoUrl.uploadedAt).toLocaleDateString("en-GB")}</span>
          </div>

        </div>
      </div>
    </div>

    <hr className="mt-2  text-white/50"></hr>
    <h1  className="text-2xl font-bold text-white mt-2">Video solution</h1>


    <div
      className="relative bg-black rounded-xl overflow-hidden max-w-3xl mx-auto mt-6 md:mt-10 select-none"
      onMouseMove={handleMouseMove}
    >

      {/* VIDEO */}
      <video
        ref={videoRef}
        src={getQualityUrl()}
        poster={videoUrl?.thumbnailUrl}
        className="w-full max-h-[70vh] object-contain"
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
      />

      {/* OVERLAY CONTROLS */}
      <div
        className={`absolute inset-0 flex flex-col justify-end transition-all duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-3 pb-4 bg-gradient-to-t from-black/80 to-transparent text-white">

          {/* PROGRESS BAR */}
          <div className="flex items-center gap-2 text-xs mb-2">
            <span>{formatTime(currentTime)}</span>

            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-red-500 h-1 cursor-pointer"
            />

            <span>{formatTime(duration)}</span>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex items-center justify-between">

            {/* LEFT CONTROLS */}
            <div className="flex items-center gap-3">

              <button
                onClick={togglePlay}
                className="p-2 bg-white/20 rounded-full cursor-pointer"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 bg-white/20 rounded-full cursor-pointer"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                className="w-20 accent-red-500 h-1 cursor-pointer"
              />
            </div>

            {/* RIGHT CONTROLS */}
            <div className="flex items-center gap-3 relative">

              {/* SETTINGS ICON */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white/20 rounded-full cursor-pointer"
              >
                <Settings size={18} />
              </button>

              {/* FULLSCREEN */}
              <button
                onClick={goFullScreen}
                className="p-2 bg-white/20 rounded-full cursor-pointer"
              >
                <Maximize size={18} />
              </button>

              {/* SETTINGS MENU */}
              {showSettings && (
                <div className="absolute bottom-12 right-0 bg-black/90 p-3 rounded-lg w-40 text-sm space-y-3 border border-white/20">

                  {/* Quality */}
                  <div>
                    <p className="text-gray-300 mb-1">Quality</p>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-black/60 px-2 py-1 rounded"
                    >
                      <option value="auto">Auto</option>
                      <option value="30">Low</option>
                      <option value="60">Medium</option>
                      <option value="80">High</option>
                    </select>
                  </div>

                  {/* Speed */}
                  <div>
                    <p className="text-gray-300 mb-1">Speed</p>
                    <select
                      value={speed}
                      onChange={(e) => changeSpeed(Number(e.target.value))}
                      className="w-full bg-black/60 px-2 py-1 rounded"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
</div>
  );
}

/* FORMAT TIME HELPERS */
function formatTime(sec) {
  if (!sec && sec !== 0) return "00:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}
