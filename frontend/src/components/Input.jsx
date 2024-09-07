const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-white" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-slate-50/70 focus:ring-1 outline-none focus:ring-slate-50/50 text-white placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};
export default Input;
