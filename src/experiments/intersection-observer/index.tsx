export const IntersectionObserver = () => {
  const items = new Array(100).fill(0).map((_, index) => index);
  return (
    <div className="flex justify-center h-100 w-screen overflow-auto">
      <div className="flex flex-col items-start justify-center p-1 h-200">
        {items.map((item) => (
          <div key={item} className="w-200 bg-gray-200 border-2 border-white">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
