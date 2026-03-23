import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductDetailClient } from "@/components/ProductDetailClient"
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/products"

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: "Product Not Found" }

  const description = product.description.replace(/[#*`]/g, "").slice(0, 155)
  return {
    title: `${product.title} — DigitalHub`,
    description,
    openGraph: {
      title: `${product.title} — DigitalHub`,
      description,
      images: [{ url: product.image, width: 800, height: 450 }],
    },
  }
}

export const revalidate = 3600

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.id, product.categoryId)
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description.replace(/[#*`]/g, "").slice(0, 300),
    image: product.image,
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: "USD",
      availability: product.availability
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: "https://t.me/bububu",
    },
    category: product.category.name,
    brand: {
      "@type": "Brand",
      name: "DigitalHub",
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_SITE_URL || "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/products` },
      { "@type": "ListItem", position: 3, name: product.category.name, item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/categories/${product.category.slug}` },
      { "@type": "ListItem", position: 4, name: product.title },
    ],
  }

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-8 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-foreground transition-colors"
            >
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[120px] md:max-w-[200px]">
            {product.title}
          </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
            {/* Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-sm">
              <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <ProductDetailClient product={product} price={price} />
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-base md:text-xl font-semibold mb-4 md:mb-6 pb-3 border-b border-border/50">
              Product Description
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-sm md:prose-base">
              <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                        <h2 className="text-base md:text-lg font-semibold mt-6 md:mt-8 mb-2 md:mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-sm md:text-base font-semibold mt-4 md:mt-6 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-4 md:pl-5 space-y-1 mb-3 md:mb-4 text-muted-foreground text-sm md:text-base">
                          {children}
                        </ul>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => (
                        <strong className="text-foreground font-semibold">{children}</strong>
                    ),
                  }}
              >
                {product.description}
              </ReactMarkdown>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-base md:text-xl font-semibold">Related Products</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/categories/${product.category.slug}`}>
                      View Category{" "}
                      <ArrowLeft className="ml-1.5 h-3.5 w-3.5 rotate-180" />
                    </Link>
                  </Button>
                </div>
                <ProductGrid products={related as never} />
              </div>
          )}
        </div>
      </>
  )
}