import Image from "next/image"

interface SenseiProps {
  type?: "fox" | "monk" | "ninja" | "default"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Sensei({ type = "default", size = "md", className = "" }: SenseiProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className} animate-float`}>
      <Image
        src={`/placeholder.svg?height=200&width=200`}
        alt={`${type} sensei`}
        width={200}
        height={200}
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {type === "fox" && (
          <div className="w-full h-full bg-gold/20 rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white rounded-full">
              <div className="w-1/3 h-1/3 bg-black rounded-full absolute top-1/3 left-1/3"></div>
            </div>
          </div>
        )}
        {type === "default" && (
          <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/4 bg-white rounded-full absolute top-1/3"></div>
          </div>
        )}
      </div>
    </div>
  )
}
