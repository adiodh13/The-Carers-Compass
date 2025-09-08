// components/Container.tsx
import clsx from "clsx";

export default function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1200px] px-4 md:px-6", className)}>
      {children}
    </div>
  );
}
