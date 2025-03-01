export default function AppFallback() {
  return (
    <div className="relative h-8 w-[100px] overflow-hidden">
      <div className="absolute left-0 bottom-1 w-6 h-6 animate-loader bg-primary" />
    </div>
  );
}
