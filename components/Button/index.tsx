type ButtonProps = {
  variant?: "default" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "sm",
  children,
  ...rest
}: ButtonProps) {
  
  const colors: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-blue-500 hover:bg-blue-300 text-white transition",
    ghost: "bg-slate-200 hover:bg-slate-300 text-slate-900 transition",
    danger: "bg-red-500 hover:bg-red-300 text-white transition",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "text-sm/tight py-1 px-2 rounded-sm [&_svg]:w-4 [&_svg]:h-4 gap-1",
    md: "text-base/tight py-2 px-4 rounded-md [&_svg]:w-5 [&_svg]:h-5 gap-2",
    lg: "text-lg/tight py-4 px-8 rounded-lg [&_svg]:w-6 [&_svg]:h-6 gap-3",
  };

  return (
    <button
      {...rest}
      className={`cursor-pointer flex disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${colors[variant]} ${sizes[size]} ${rest.className}`}
    >
      {children}
    </button>
  );
}
