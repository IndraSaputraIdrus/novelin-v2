interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={`max-w-2xl mx-auto px-5 md:px-3 ${className || ""}`}>
      {children}
    </div>
  );
}
