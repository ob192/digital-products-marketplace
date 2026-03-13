import { prisma } from './prisma'

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { products: true } },
    },
  })
  return categories
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { products: true } },
    },
  })
  return category
}

export async function getAllCategorySlugs() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })
  return categories.map(c => c.slug)
}
