const UserAvatar = (username: string) => {
  const letter = username[0].toUpperCase(); // Get first letter
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {letter}
    </div>
  );
};
