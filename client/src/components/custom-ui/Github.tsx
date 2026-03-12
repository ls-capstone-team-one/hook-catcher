import InvertoCat from "@/src/assets/GitHub_Invertocat_Black.svg"

type LinkParams = {
  url: string
  altText?: string
}

export default function GHInvertoCat({
  url,
  altText = "GitHub logo",
}: LinkParams) {
  return (
    <a href={url} aria-label="Visit the GitHub repository">
      <img src={InvertoCat} alt={altText} />
    </a>
  )
}
