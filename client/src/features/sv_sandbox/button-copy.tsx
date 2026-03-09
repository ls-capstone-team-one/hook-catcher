import { Button } from "@/components/ui/button"
import { ClipboardCopy } from "lucide-react"

export default function CopyButton({
  content,
  className = "",
}: {
  content: string
  className?: string
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy to clipboard"
      className={className}
      onClick={() => navigator.clipboard.writeText(content)}
    >
      <ClipboardCopy />
    </Button>
  )
}