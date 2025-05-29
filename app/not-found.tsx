import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">The page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
