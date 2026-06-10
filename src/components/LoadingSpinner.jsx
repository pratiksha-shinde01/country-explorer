const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950">

      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-white mt-4 text-lg">
        Loading...
      </p>

    </div>
  );
};

export default LoadingSpinner;