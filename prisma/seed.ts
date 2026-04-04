import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const bmCategory = await prisma.category.upsert({
    where: { slug: 'bm' },
    update: {},
    create: {
      name: 'Facebook БМ (Business Manager)',
      slug: 'bm',
      description: 'Facebook Business Manager аккаунты различных лимитов.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
    },
  })

  const autoregCategory = await prisma.category.upsert({
    where: { slug: 'autoreg' },
    update: {},
    create: {
      name: 'Facebook Авторег',
      slug: 'autoreg',
      description: 'Авторегистрированные Facebook аккаунты.',
      image: 'https://images.unsplash.com/photo-1611605698335-8441a7b5f8c1?w=400&q=80',
    },
  })

  const farmCategory = await prisma.category.upsert({
    where: { slug: 'farm' },
    update: {},
    create: {
      name: 'Facebook Фарм',
      slug: 'farm',
      description: 'Фармленные Facebook аккаунты USA + UKR.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    },
  })

  const fpCategory = await prisma.category.upsert({
    where: { slug: 'fp' },
    update: {},
    create: {
      name: 'Facebook FP (Fan Page)',
      slug: 'fp',
      description: 'Facebook Fan Page аккаунты.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    },
  })

  const pzrdCategory = await prisma.category.upsert({
    where: { slug: 'pzrd' },
    update: {},
    create: {
      name: 'Facebook ПЗРД',
      slug: 'pzrd',
      description:
          'Facebook аккаунты с пройденным ПЗРД (запрет рекламной деятельности). Повышенный траст и устойчивость к ограничениям.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    },
  })

  const pixelCategory = await prisma.category.upsert({
    where: { slug: 'pixel' },
    update: {},
    create: {
      name: 'Facebook Вечный пиксель (PIXEL)',
      slug: 'pixel',
      description: 'Вечные Facebook пиксели для отслеживания конверсий.',
      image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80',
    },
  })

  const agentFbCategory = await prisma.category.upsert({
    where: { slug: 'agent-fb' },
    update: {},
    create: {
      name: 'Facebook Агентские аккаунты 8%',
      slug: 'agent-fb',
      description: 'Агентские рекламные аккаунты Facebook с комиссией 8%.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
    },
  })

  const tiktokAdsCategory = await prisma.category.upsert({
    where: { slug: 'tiktok-ads' },
    update: {},
    create: {
      name: 'TikTok ADS (Business Center)',
      slug: 'tiktok-ads',
      description: 'Аккаунты TikTok Ads с Business Center и рекламными кабинетами.',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80',
    },
  })

  const agentTikTokCategory = await prisma.category.upsert({
    where: { slug: 'agent-tiktok' },
    update: {},
    create: {
      name: 'TikTok Агентские аккаунты 9%',
      slug: 'agent-tiktok',
      description: 'Агентские рекламные аккаунты TikTok с комиссией 9%.',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80',
    },
  })

  await Promise.all([

    prisma.product.upsert({
      where: { slug: 'priglasheniya-bm-biznes-menedzher' },
      update: {},
      create: {
        slug: 'priglasheniya-bm-biznes-menedzher',
        title: 'Приглашения Facebook БМ (Бизнес Менеджер)',
        description:
            'Купить приглашения в Business Manager Facebook для быстрого добавления аккаунтов, пользователей и рекламных активов. Подходят для масштабирования рекламных кампаний, работы с командой и управления рекламой в разных гео. Все страны в наличии, стабильная работа.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_bsed9ybsed9ybsed.png',
        minOrder: 1,
        price: 5.00,
        availability: true,
        tags: ['facebook', 'bm', 'invite', 'business-manager'],
        categoryId: bmCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'facebook-avtoreg' },
      update: {},
      create: {
        slug: 'facebook-avtoreg',
        title: 'Facebook — Авторег',
        description:
            'Свежие авторег аккаунты Facebook для фарма, рекламы и арбитража трафика. Подходят для массового использования, тестирования гипотез и запуска рекламных кампаний. Все гео доступны.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_6mf3706mf3706mf3.png',
        minOrder: 1,
        price: 1.00,
        availability: true,
        tags: ['facebook', 'autoreg'],
        categoryId: autoregCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'facebook-avtoreg-fp' },
      update: {},
      create: {
        slug: 'facebook-avtoreg-fp',
        title: 'Facebook — Авторег + ФП',
        description:
            'Купить Facebook аккаунт с готовой FanPage для быстрого запуска рекламы. Не требует дополнительной настройки страницы — можно сразу запускать рекламные кампании. Подходит для арбитражников и маркетологов.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_wl9juvwl9juvwl9j.png',
        minOrder: 1,
        price: 1.25,
        availability: true,
        tags: ['facebook', 'autoreg', 'fp', 'fanpage'],
        categoryId: autoregCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'facebook-vip-king-farm-30-plus-dney' },
      update: {},
      create: {
        slug: 'facebook-vip-king-farm-30-plus-dney',
        title: 'Facebook — VIP KING (Фарм 30+ дней)',
        description:
            'Фармленные Facebook аккаунты (30+ дней) с высоким трастом (KING). Имеют историю активности, что снижает риск блокировок. Подходят для стабильной работы с рекламой и масштабирования кампаний.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_vjtnttvjtnttvjtn.png',
        minOrder: 1,
        price: 12.00,
        availability: true,
        tags: ['facebook', 'farm', 'vip', 'king', '30days'],
        categoryId: farmCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'fanpage-fp' },
      update: {},
      create: {
        slug: 'fanpage-fp',
        title: 'Facebook FanPage / ФП / FP',
        description:
            'Готовые FanPage Facebook для запуска рекламы и привязки к Business Manager. Подходят для быстрого старта рекламных кампаний без необходимости создания страницы.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_dn268ydn268ydn26.png',
        minOrder: 1,
        price: 5.00,
        availability: true,
        tags: ['facebook', 'fp', 'fanpage'],
        categoryId: fpCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'fanpage-fp-pzrd' },
      update: {},
      create: {
        slug: 'fanpage-fp-pzrd',
        title: 'Facebook FanPage / ФП / FP / PZRD',
        description:
            'FanPage Facebook с пройденным ПЗРД. Повышенный уровень доверия и стабильности для работы с рекламой, включая чувствительные ниши и арбитраж трафика.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_pkmuhfpkmuhfpkmu.png',
        minOrder: 1,
        price: 9.00,
        availability: true,
        tags: ['facebook', 'fp', 'fanpage', 'pzrd'],
        categoryId: pzrdCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'priglasheniya-bm-pzrd' },
      update: {},
      create: {
        slug: 'priglasheniya-bm-pzrd',
        title: 'Приглашения Facebook БМ ПЗРД',
        description:
            'Приглашения в Business Manager Facebook с пройденным ПЗРД (запрет на рекламную деятельность). Обеспечивают повышенный уровень доверия и стабильности. Отличный выбор для арбитража трафика и работы с ограниченными аккаунтами.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_waylljwaylljwayl.png',
        minOrder: 1,
        price: 9.00,
        availability: true,
        tags: ['facebook', 'bm', 'invite', 'pzrd'],
        categoryId: pzrdCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'facebook-vip-pzrd-king-farm-30-plus-dney' },
      update: {},
      create: {
        slug: 'facebook-vip-pzrd-king-farm-30-plus-dney',
        title: 'Facebook — VIP PZRD KING (Фарм 30+ дней)',
        description:
            'Премиальные Facebook аккаунты с фармом 30+ дней и пройденным ПЗРД. Максимальный уровень доверия, устойчивость к ограничениям и готовность к запуску рекламы в сложных вертикалях.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_my5pwpmy5pwpmy5p.png',
        minOrder: 1,
        price: 15.00,
        availability: true,
        tags: ['facebook', 'farm', 'vip', 'king', 'pzrd', '30days'],
        categoryId: pzrdCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'pixel-eternal' },
      update: {},
      create: {
        slug: 'pixel-eternal',
        title: 'Facebook Вечный пиксель PIXEL',
        description: 'Вечный Facebook Pixel для отслеживания конверсий.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_8d0z0q8d0z0q8d0z.png',
        minOrder: 1,
        price: 40.00,
        availability: true,
        tags: ['facebook', 'pixel', 'tracking'],
        categoryId: pixelCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'agent-fb-8' },
      update: {},
      create: {
        slug: 'agent-fb-8',
        title: 'Facebook Агентский аккаунт 8%',
        description: 'Агентский рекламный аккаунт Facebook с комиссией 8%.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_f3qyp4f3qyp4f3qy.png',
        minOrder: 1,
        price: 99.00,
        availability: true,
        tags: ['facebook', 'agent', '8percent'],
        categoryId: agentFbCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'akkaunty-tiktok-ads-biznes-tsentr-3-rk' },
      update: {},
      create: {
        slug: 'akkaunty-tiktok-ads-biznes-tsentr-3-rk',
        title: 'TikTok ADS + Бизнес Центр (3 РК)',
        description:
            'Купить аккаунт TikTok Ads с Business Center и 3 рекламными кабинетами. Полностью готов к работе: подтвержденная компания, валюта USD, без НДС, почта в комплекте. Отлично подходит для тестирования рекламных кампаний.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_32e8bs32e8bs32e8.png',
        minOrder: 1,
        price: 8.00,
        availability: true,
        tags: ['tiktok', 'ads', 'business-center', '3rk'],
        categoryId: tiktokAdsCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'akkaunty-tiktok-ads-biznes-tsentr-5-rk' },
      update: {},
      create: {
        slug: 'akkaunty-tiktok-ads-biznes-tsentr-5-rk',
        title: 'TikTok ADS + Бизнес Центр (5 РК)',
        description:
            'Аккаунты TikTok Ads с Business Center и 5 рекламными кабинетами для масштабирования рекламы. Подтвержденные аккаунты с полной настройкой, подходят для арбитража трафика и командной работы.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_hyddpbhyddpbhydd.png',
        minOrder: 1,
        price: 12.00,
        availability: true,
        tags: ['tiktok', 'ads', 'business-center', '5rk'],
        categoryId: tiktokAdsCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'akkaunty-tiktok-ads-biznes-tsentr-8-rk' },
      update: {},
      create: {
        slug: 'akkaunty-tiktok-ads-biznes-tsentr-8-rk',
        title: 'TikTok ADS + Бизнес Центр (8 РК)',
        description:
            'Профессиональные TikTok Ads аккаунты с Business Center и 8 рекламными кабинетами. Максимальные возможности для масштабирования, стабильная работа и готовность к запуску рекламных кампаний в любых гео.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_y8uudpy8uudpy8uu.png',
        minOrder: 1,
        price: 15.00,
        availability: true,
        tags: ['tiktok', 'ads', 'business-center', '8rk'],
        categoryId: tiktokAdsCategory.id,
      },
    }),

    prisma.product.upsert({
      where: { slug: 'agent-tiktok-9' },
      update: {},
      create: {
        slug: 'agent-tiktok-9',
        title: 'TikTok Агентский аккаунт 9%',
        description: 'Агентский рекламный аккаунт TikTok с комиссией 9%.',
        image: 'https://somerandomshit.b-cdn.net/Gemini_Generated_Image_161uu8161uu8161u.png',
        minOrder: 1,
        price: 99.00,
        availability: true,
        tags: ['tiktok', 'agent', '9percent'],
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