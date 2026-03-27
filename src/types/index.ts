export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  createdAt: Date
  updatedAt: Date
  _count?: {
    products: number
  }
}

export interface Product {
  id: string
  slug: string
  title: string
  description: string
  image: string
  minOrder: number
  price: number | string
  availability: boolean
  tags: string[]
  categoryId: string
  category: Category
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithCategory extends Product {
  category: Category
}

export interface PaginatedProducts {
  products: ProductWithCategory[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ProductFilters {
  search?: string
  categoryId?: string
  categorySlug?: string
  tag?: string
  page?: number
  pageSize?: number
  availability?: boolean
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'

export interface Order {
  id: string
  userId: string
  productId: string
  product: {
    id: string
    title: string
    slug: string
    image: string
    category: { name: string; slug: string }
  }
  quantity: number
  totalPrice: number | string
  status: OrderStatus
  createdAt: string | Date
  updatedAt: string | Date
}
