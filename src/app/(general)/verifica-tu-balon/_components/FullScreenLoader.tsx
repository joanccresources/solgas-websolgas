"use client";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center backdrop-blur-[6px]">
      <div className="w-16 h-16 border-4 border-white border-t-primary-orange rounded-full animate-spin" />
    </div>
  );
}