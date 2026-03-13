import { prisma } from './prisma'
import type { ProductFilters, PaginatedProducts } from '@/types'

const DEFAULT_PAGE_SIZE = 12

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
  const {
    search,
    categoryId,
    categorySlug,
    tag,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters

  const where: Record<string, unknown> = {}

  if (search) {
    where.title = { contains: search, mode: 'insensitive' }
  }

  if (categoryId) {
    where.categoryId = categoryId
  }

  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  if (tag) {
    where.tags = { has: tag }
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ])

  return {
    products: products.map(p => ({
      ...p,
      price: p.price.toNumber(),
    })) as never,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getFeaturedProducts(limit = 8) {
  const products = await prisma.product.findMany({
    where: { availability: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return products.map(p => ({ ...p, price: p.price.toNumber() }))
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) return null

  return { ...product, price: product.price.toNumber() }
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
      availability: true,
    },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })

  return products.map(p => ({ ...p, price: p.price.toNumber() }))
}

export async function getAllProductSlugs() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  })
  return products.map(p => p.slug)
}
