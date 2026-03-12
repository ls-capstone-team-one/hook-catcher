import InvertoCat from "@/src/assets/GitHub_Invertocat_Black.svg";  


type LinkParams = {
  url: string;
  alt_text: string;
}

export default function GHInvertoCat({
  url,
  alt_text="Github Logo.  Click to visit the project repo"
}: LinkParams) {
  return (
    <a href={url}>
      <img src={InvertoCat} alt={alt_text} />
    </a>
  )
}