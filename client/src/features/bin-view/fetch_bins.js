import { env } from "@/config/env"

export async function getAllBins() {
  const response = await fetch(`${env.API_URL}/api/bins`)
  const data = await response.json()
  console.log(data)
  return data
}

export async function getBin(id) {
  const response = await fetch(`${env.API_URL}/api/bins/${id}`)
  const data = await response.json()
  return data
}
