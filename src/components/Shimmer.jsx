

export default function Shimmer() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-10 px-4">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-10 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] 
                       rounded-lg bg-[#353535]/60 backdrop-blur-3xl 
                       shadow-[5px_5px_10px_rgba(0,0,0,0.3)] animate-pulse"
          ></div>
        ))}
    </div>
  );
}
