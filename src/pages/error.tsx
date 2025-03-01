import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold">
        Oops!
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">
        Something went wrong.
      </h2>
      <p className="mt-2">
        Something went wrong. Please try again later.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="default" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  )
}
