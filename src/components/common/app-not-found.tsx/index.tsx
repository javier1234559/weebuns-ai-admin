import { buttonVariants } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export const AppNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">
        UH OH! You're lost.
      </h2>
      <p className="mt-2">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <button
        className={cn("mt-4", buttonVariants({ variant: "default" }))}
        onClick={() => navigate("/")}
      >
        HOME
      </button>
    </div>
  )
}
