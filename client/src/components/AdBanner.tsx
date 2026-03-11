import { cn } from "@/lib/utils";

interface AdBannerProps {
  variant?: "horizontal" | "rectangle" | "vertical";
  className?: string;
  label?: string;
}

export function AdBanner({ variant = "horizontal", className, label = "Publicidade" }: AdBannerProps) {
  const variantStyles = {
    horizontal: "w-full max-w-[728px] h-[90px] mx-auto",
    rectangle: "w-[300px] h-[250px] mx-auto",
    vertical: "w-[160px] h-[600px] mx-auto",
  };

  return (
    <div 
      className={cn(
        "bg-gray-100 flex items-center justify-center border border-gray-200 shadow-inner rounded-sm relative overflow-hidden",
        variantStyles[variant],
        className
      )}
      aria-label="Advertisement Placeholder"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase z-10">
        {label}
      </span>
    </div>
  );
}
