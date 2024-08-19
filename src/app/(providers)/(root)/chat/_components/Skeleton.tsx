function Skeleton() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-primary-green-100 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-primary-green-100 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-primary-green-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
