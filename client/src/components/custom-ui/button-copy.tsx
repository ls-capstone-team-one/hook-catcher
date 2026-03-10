/**
  A general purpose "Copy" button, 
  like you might use to copy text from a Code Block
 */

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"

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
      className={cn("hover:filter-[invert(20%)]", className)}
      onClick={() => navigator.clipboard.writeText(content)}
    >
      <Copy />
    </Button>
  )
}
