import { getCategories } from "@/lib/categories"
import { HomeContent } from "@/components/HomeContent"

export const revalidate = 3600

export default async function HomePage() {
  const categories = await getCategories()

  return <HomeContent categories={categories} />
}
