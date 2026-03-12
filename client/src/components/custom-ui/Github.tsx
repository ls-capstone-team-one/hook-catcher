import InvertoCat from "@/assets/GitHub_Invertocat_Black.svg"

type LinkParams = {
  url: string
  altText?: string
  className?: string
}

export default function GHInvertoCat({
  url,
  altText = "GitHub logo",
  className,
}: LinkParams) {
  return (
    <a href={url} aria-label="Visit the GitHub repository" className={className}>
      <img src={InvertoCat} alt={altText} />
    </a>
  )
}
