"use client";

export default function TableHeaderPage({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center py-2.5 px-2">
      <p className="text-xl py-1 sm:py-0 sm:text-base md:text-lg font-semibold">
        {title}
      </p>
      {children}
    </div>
  );
}
