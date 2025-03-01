import { buttonVariants } from "@/components/ui/button"
import { m } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center text-center">
      <m.h1
        className="text-9xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Oops!
      </m.h1>
      <m.h2
        className="mt-4 text-2xl font-semibold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Something went wrong.
      </m.h2>
      <m.p
        className="mt-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Something went wrong. Please try again later.
      </m.p>
      <m.button
        className={cn("mt-4", buttonVariants({ variant: "default" }))}
        onClick={() => navigate(0)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Refresh
      </m.button>
    </div>
  )
}
