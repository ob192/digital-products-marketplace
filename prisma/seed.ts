import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
// Категории
  const bmCategory = await prisma.category.upsert({
    where: { slug: 'bm' },
    update: {},
    create: {
      name: 'БМ (Business Manager)',
      slug: 'bm',
      description: 'Facebook Business Manager аккаунты различных лимитов.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
    },
  })

  const autoregCategory = await prisma.category.upsert({
    where: { slug: 'autoreg' },
    update: {},
    create: {
      name: 'Авторег',
      slug: 'autoreg',
      description: 'Авторегистрированные Facebook аккаунты.',
      image: 'https://images.unsplash.com/photo-1611605698335-8441a7b5f8c1?w=400&q=80',
    },
  })

  const farmCategory = await prisma.category.upsert({
    where: { slug: 'farm' },
    update: {},
    create: {
      name: 'Фарм',
      slug: 'farm',
      description: 'Фармленные аккаунты USA + UKR.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    },
  })

  const fpCategory = await prisma.category.upsert({
    where: { slug: 'fp' },
    update: {},
    create: {
      name: 'FP (Fan Page)',
      slug: 'fp',
      description: 'Facebook Fan Page аккаунты.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    },
  })

  const pixelCategory = await prisma.category.upsert({
    where: { slug: 'pixel' },
    update: {},
    create: {
      name: 'Вечный пиксель (PIXEL)',
      slug: 'pixel',
      description: 'Вечные пиксели Facebook для отслеживания конверсий.',
      image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80',
    },
  })

  const agentFbCategory = await prisma.category.upsert({
    where: { slug: 'agent-fb' },
    update: {},
    create: {
      name: 'Агентские аккаунты FB 8%',
      slug: 'agent-fb',
      description: 'Агентские рекламные аккаунты Facebook с комиссией 8%.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
    },
  })

  const agentTikTokCategory = await prisma.category.upsert({
    where: { slug: 'agent-tiktok' },
    update: {},
    create: {
      name: 'Агентские аккаунты TikTok 9%',
      slug: 'agent-tiktok',
      description: 'Агентские рекламные аккаунты TikTok с комиссией 9%.',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80',
    },
  })

  await Promise.all([
    // БМ
    prisma.product.upsert({
      where: { slug: 'bm-standard' },
      update: {},
      create: {
        slug: 'bm-standard',
        title: 'БМ',
        description: 'Стандартный Facebook Business Manager аккаунт.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
        minOrder: 1,
        price: 15.00,
        availability: true,
        tags: ['bm', 'facebook', 'business-manager'],
        categoryId: bmCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'bm-pzrd' },
      update: {},
      create: {
        slug: 'bm-pzrd',
        title: 'БМ прзд',
        description: 'Facebook Business Manager аккаунт — прогретый.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
        minOrder: 1,
        price: 25.00,
        availability: true,
        tags: ['bm', 'pzrd', 'facebook'],
        categoryId: bmCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'bm-50-limited' },
      update: {},
      create: {
        slug: 'bm-50-limited',
        title: 'БМ $50 Limited',
        description: 'Facebook Business Manager с лимитом $50.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
        minOrder: 1,
        price: 35.00,
        availability: true,
        tags: ['bm', 'limited', '50', 'facebook'],
        categoryId: bmCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'bm-250-limited' },
      update: {},
      create: {
        slug: 'bm-250-limited',
        title: 'БМ $250 Limited',
        description: 'Facebook Business Manager с лимитом $250.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
        minOrder: 1,
        price: 55.00,
        availability: true,
        tags: ['bm', 'limited', '250', 'facebook'],
        categoryId: bmCategory.id,
      },
    }),

    // Авторег
    prisma.product.upsert({
      where: { slug: 'autoreg-standard' },
      update: {},
      create: {
        slug: 'autoreg-standard',
        title: 'Авторег',
        description: 'Авторегистрированный Facebook аккаунт.',
        image: 'https://images.unsplash.com/photo-1611605698335-8441a7b5f8c1?w=800&q=80',
        minOrder: 1,
        price: 5.00,
        availability: true,
        tags: ['autoreg', 'facebook'],
        categoryId: autoregCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'autoreg-fp' },
      update: {},
      create: {
        slug: 'autoreg-fp',
        title: 'Авторег + ФП',
        description: 'Авторегистрированный Facebook аккаунт с Fan Page.',
        image: 'https://images.unsplash.com/photo-1611605698335-8441a7b5f8c1?w=800&q=80',
        minOrder: 1,
        price: 8.00,
        availability: true,
        tags: ['autoreg', 'fp', 'facebook'],
        categoryId: autoregCategory.id,
      },
    }),

    // Фарм
    prisma.product.upsert({
      where: { slug: 'farm-usa-ukr' },
      update: {},
      create: {
        slug: 'farm-usa-ukr',
        title: 'Farm USA + UKR',
        description: 'Фармленный аккаунт USA + UKR.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        minOrder: 1,
        price: 20.00,
        availability: true,
        tags: ['farm', 'usa', 'ukr', 'facebook'],
        categoryId: farmCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'farm-usa-ukr-pzrd' },
      update: {},
      create: {
        slug: 'farm-usa-ukr-pzrd',
        title: 'Farm USA + UKR пзрд',
        description: 'Фармленный прогретый аккаунт USA + UKR.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        minOrder: 1,
        price: 30.00,
        availability: true,
        tags: ['farm', 'usa', 'ukr', 'pzrd', 'facebook'],
        categoryId: farmCategory.id,
      },
    }),

    // FP
    prisma.product.upsert({
      where: { slug: 'fp-standard' },
      update: {},
      create: {
        slug: 'fp-standard',
        title: 'FP',
        description: 'Facebook Fan Page аккаунт.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        minOrder: 1,
        price: 10.00,
        availability: true,
        tags: ['fp', 'fanpage', 'facebook'],
        categoryId: fpCategory.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'fp-pzrd' },
      update: {},
      create: {
        slug: 'fp-pzrd',
        title: 'FP PZRD',
        description: 'Facebook Fan Page аккаунт — прогретый.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        minOrder: 1,
        price: 18.00,
        availability: true,
        tags: ['fp', 'pzrd', 'fanpage', 'facebook'],
        categoryId: fpCategory.id,
      },
    }),

    // Вечный пиксель
    prisma.product.upsert({
      where: { slug: 'pixel-eternal' },
      update: {},
      create: {
        slug: 'pixel-eternal',
        title: 'Вечный пиксель PIXEL',
        description: 'Вечный Facebook Pixel для отслеживания конверсий.',
        image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&q=80',
        minOrder: 1,
        price: 40.00,
        availability: true,
        tags: ['pixel', 'facebook', 'tracking'],
        categoryId: pixelCategory.id,
      },
    }),

    // Агентские FB
    prisma.product.upsert({
      where: { slug: 'agent-fb-8' },
      update: {},
      create: {
        slug: 'agent-fb-8',
        title: 'Агентский аккаунт FB 8%',
        description: 'Агентский рекламный аккаунт Facebook с комиссией 8%.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        minOrder: 1,
        price: 99.00,
        availability: true,
        tags: ['agent', 'facebook', '8percent'],
        categoryId: agentFbCategory.id,
      },
    }),

    // Агентские TikTok
    prisma.product.upsert({
      where: { slug: 'agent-tiktok-9' },
      update: {},
      create: {
        slug: 'agent-tiktok-9',
        title: 'Агентский аккаунт TikTok 9%',
        description: 'Агентский рекламный аккаунт TikTok с комиссией 9%.',
        image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
        minOrder: 1,
        price: 99.00,
        availability: true,
        tags: ['agent', 'tiktok', '9percent'],
        categoryId: agentTikTokCategory.id,
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
