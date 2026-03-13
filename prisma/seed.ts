import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'streaming' },
      update: {},
      create: {
        name: 'Streaming Accounts',
        slug: 'streaming',
        description: 'Premium streaming service accounts including Netflix, Spotify, Disney+, and more. All accounts are freshly generated and verified.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming' },
      update: {},
      create: {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Game keys, in-game currencies, accounts for popular platforms like Steam, PlayStation, Xbox, and more.',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'software' },
      update: {},
      create: {
        name: 'Software & Tools',
        slug: 'software',
        description: 'Licensed software, productivity tools, VPN subscriptions, and developer utilities at competitive prices.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'social-media' },
      update: {},
      create: {
        name: 'Social Media',
        slug: 'social-media',
        description: 'Social media accounts, followers, engagement packages for Instagram, TikTok, YouTube, and other platforms.',
        image: 'https://images.unsplash.com/photo-1611605698335-8441a7b5f8c1?w=400&q=80',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gift-cards' },
      update: {},
      create: {
        name: 'Gift Cards',
        slug: 'gift-cards',
        description: 'Digital gift cards for Amazon, Google Play, Apple, and popular retailers. Instant delivery.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'education' },
      update: {},
      create: {
        name: 'Education',
        slug: 'education',
        description: 'Udemy courses, Coursera subscriptions, Duolingo Plus, and other e-learning platform access.',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Get category IDs
  const [streaming, gaming, software, socialMedia, giftCards, education] = categories

  // Create products
  const products = await Promise.all([
    // Streaming products
    prisma.product.upsert({
      where: { slug: 'netflix-premium-1-month' },
      update: {},
      create: {
        slug: 'netflix-premium-1-month',
        title: 'Netflix Premium 1 Month',
        description: `## Netflix Premium Account — 1 Month

Enjoy unlimited streaming with Netflix Premium. Get access to 4K Ultra HD content on up to 4 screens simultaneously.

### What You Get
- Full Premium tier access
- 4K Ultra HD + HDR content
- Up to 4 simultaneous screens
- Downloads on up to 6 devices
- Access to entire Netflix library

### How It Works
1. Purchase the account
2. Receive credentials via our platform
3. Log in and start watching immediately

### Notes
- Account is valid for 30 days
- Do not change account passwords
- Use on your personal devices only`,
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
        minOrder: 1,
        price: 12.99,
        availability: true,
        tags: ['netflix', 'streaming', '4k', 'premium', 'video'],
        categoryId: streaming.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'spotify-premium-3-months' },
      update: {},
      create: {
        slug: 'spotify-premium-3-months',
        title: 'Spotify Premium 3 Months',
        description: `## Spotify Premium — 3 Month Subscription

Listen to music without ads with Spotify Premium. Download your favorite tracks and enjoy offline listening.

### Features Included
- Ad-free music streaming
- Unlimited skips
- Offline listening (download up to 10,000 songs)
- High quality audio (up to 320kbps)
- Works on all devices

### Delivery
Instant delivery via account credentials. Valid for 90 days from activation.`,
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
        minOrder: 1,
        price: 8.49,
        availability: true,
        tags: ['spotify', 'music', 'premium', 'audio'],
        categoryId: streaming.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'disney-plus-bundle-1-month' },
      update: {},
      create: {
        slug: 'disney-plus-bundle-1-month',
        title: 'Disney+ Bundle 1 Month',
        description: `## Disney+ Premium Bundle — 1 Month

Access Disney+, Hulu, and ESPN+ in one bundle. Stream thousands of movies and shows from Disney, Marvel, Star Wars, Pixar, and National Geographic.

### Bundle Includes
- Disney+ full library access
- Hulu (ad-supported) 
- ESPN+ live sports
- Marvel & Star Wars content
- Pixar animated films

### Details
- 4K streaming available
- Up to 4 simultaneous streams
- 30-day validity`,
        image: 'https://images.unsplash.com/photo-1568690346022-1ee39b9c2fce?w=800&q=80',
        minOrder: 1,
        price: 15.99,
        availability: true,
        tags: ['disney', 'hulu', 'espn', 'bundle', 'streaming'],
        categoryId: streaming.id,
      },
    }),

    // Gaming products
    prisma.product.upsert({
      where: { slug: 'steam-wallet-50' },
      update: {},
      create: {
        slug: 'steam-wallet-50',
        title: 'Steam Wallet $50 Code',
        description: `## Steam Wallet Code — $50

Add funds directly to your Steam wallet and purchase any game, DLC, or in-game item from the Steam store.

### Features
- Works for any region (global)
- Instant code delivery
- No expiry date
- Use for games, DLC, items, or gifts

### How to Redeem
1. Open Steam client
2. Go to Games > Redeem a Steam Product Code
3. Enter your code
4. Funds added instantly

### Minimum Order
Purchase in quantities of 1 or more codes.`,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
        minOrder: 1,
        price: 49.99,
        availability: true,
        tags: ['steam', 'wallet', 'gaming', 'valve', 'pc'],
        categoryId: gaming.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'xbox-game-pass-ultimate-1-month' },
      update: {},
      create: {
        slug: 'xbox-game-pass-ultimate-1-month',
        title: 'Xbox Game Pass Ultimate 1 Month',
        description: `## Xbox Game Pass Ultimate — 1 Month

Access 100+ high-quality games on console and PC. Play new games on day one, enjoy EA Play, and get exclusive member discounts.

### What's Included
- Xbox Game Pass for Console
- PC Game Pass
- Xbox Live Gold
- EA Play membership
- Day-one releases from Xbox Game Studios

### Gaming Anywhere
- Console (Xbox One, Xbox Series X|S)
- PC (Windows)
- Cloud Gaming on mobile

Includes exclusive member deals and discounts on games and add-ons.`,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
        minOrder: 1,
        price: 14.99,
        availability: true,
        tags: ['xbox', 'gamepass', 'microsoft', 'console', 'gaming'],
        categoryId: gaming.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'roblox-robux-1000' },
      update: {},
      create: {
        slug: 'roblox-robux-1000',
        title: 'Roblox 1000 Robux',
        description: `## Roblox — 1000 Robux

Top up your Roblox account with 1000 Robux. Purchase avatar accessories, game passes, and exclusive items.

### What You Can Buy
- Avatar accessories and clothing
- Game passes for your favorite games
- Developer Exchange items
- Special limited edition collectibles

### Delivery
- Delivered via gift card code
- Works worldwide
- No expiry date

Order in larger quantities for bulk discounts. Minimum order is 5 units.`,
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
        minOrder: 5,
        price: 9.99,
        availability: true,
        tags: ['roblox', 'robux', 'gaming', 'kids', 'virtual'],
        categoryId: gaming.id,
      },
    }),

    // Software products
    prisma.product.upsert({
      where: { slug: 'nordvpn-1-year' },
      update: {},
      create: {
        slug: 'nordvpn-1-year',
        title: 'NordVPN 1 Year Subscription',
        description: `## NordVPN — 1 Year Plan

Stay private and secure online with NordVPN. Access 5500+ servers in 60+ countries with military-grade encryption.

### Key Features
- 5500+ servers in 60+ countries
- AES-256 encryption
- No-logs policy (verified by audit)
- Up to 6 simultaneous connections
- Double VPN & Onion Over VPN
- Kill Switch & DNS leak protection
- Works on Windows, Mac, Linux, iOS, Android

### Perfect For
- Bypassing geo-restrictions
- Secure public Wi-Fi browsing
- Streaming services from any region
- Privacy-conscious users`,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        minOrder: 1,
        price: 59.99,
        availability: true,
        tags: ['vpn', 'security', 'privacy', 'nordvpn', 'software'],
        categoryId: software.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'microsoft-office-365-1-year' },
      update: {},
      create: {
        slug: 'microsoft-office-365-1-year',
        title: 'Microsoft 365 Personal 1 Year',
        description: `## Microsoft 365 Personal — 1 Year License

Full access to Word, Excel, PowerPoint, Outlook, and more. Includes 1TB of OneDrive cloud storage.

### Applications Included
- Microsoft Word
- Microsoft Excel
- Microsoft PowerPoint
- Microsoft Outlook
- Microsoft OneNote
- Microsoft Access & Publisher (PC only)

### Cloud Benefits
- 1TB OneDrive storage
- Advanced security features
- Microsoft Support access
- Regular feature updates

### Compatibility
Works on PC, Mac, iOS, and Android. Valid for 1 user, usable on multiple devices.`,
        image: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=800&q=80',
        minOrder: 1,
        price: 69.99,
        availability: true,
        tags: ['microsoft', 'office', 'productivity', 'word', 'excel'],
        categoryId: software.id,
      },
    }),

    // Gift Cards
    prisma.product.upsert({
      where: { slug: 'amazon-gift-card-25' },
      update: {},
      create: {
        slug: 'amazon-gift-card-25',
        title: 'Amazon Gift Card $25',
        description: `## Amazon Gift Card — $25

Give the gift of choice with an Amazon Gift Card. Redeemable for millions of items across Amazon's entire store.

### Details
- $25 value
- Never expires
- Works on amazon.com
- Can be redeemed for physical items, digital content, or services
- No fees

### How to Use
1. Log in to your Amazon account
2. Go to Your Account > Gift Cards
3. Enter your claim code
4. Balance added automatically

### Bulk Orders
Minimum 2 units per order. Volume pricing available for 10+ units.`,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
        minOrder: 2,
        price: 24.50,
        availability: true,
        tags: ['amazon', 'gift-card', 'shopping', 'digital'],
        categoryId: giftCards.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'google-play-gift-card-10' },
      update: {},
      create: {
        slug: 'google-play-gift-card-10',
        title: 'Google Play Gift Card $10',
        description: `## Google Play Gift Card — $10

Add credit to your Google Play account and purchase apps, games, movies, books, and subscriptions.

### Works For
- Apps & Games on Android
- Movies & TV Shows
- Books & Audiobooks
- Google One storage plans
- YouTube Premium subscriptions
- In-app purchases

### Redemption
- Enter code in Google Play Store
- Instant credit addition
- Valid for US accounts
- No expiry date

Minimum order: 3 units.`,
        image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&q=80',
        minOrder: 3,
        price: 9.75,
        availability: true,
        tags: ['google', 'android', 'gift-card', 'apps'],
        categoryId: giftCards.id,
      },
    }),

    // Social Media
    prisma.product.upsert({
      where: { slug: 'instagram-followers-1000' },
      update: {},
      create: {
        slug: 'instagram-followers-1000',
        title: 'Instagram Followers 1000',
        description: `## Instagram — 1000 Real Followers

Boost your Instagram presence with high-quality followers. All accounts are real and active, ensuring sustainable growth.

### Package Details
- 1000 genuine followers
- Gradual delivery (2-5 days)
- No password required
- Retention guarantee for 30 days
- 24/7 support

### Important Notes
- Provide only your Instagram username
- Keep your account public during delivery
- Works for personal, business, and creator accounts

### Minimum Order
Order minimum 1 package. Bundle multiple packages for bulk pricing.`,
        image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
        minOrder: 1,
        price: 19.99,
        availability: true,
        tags: ['instagram', 'followers', 'social-media', 'growth'],
        categoryId: socialMedia.id,
      },
    }),

    // Education
    prisma.product.upsert({
      where: { slug: 'udemy-course-bundle' },
      update: {},
      create: {
        slug: 'udemy-course-bundle',
        title: 'Udemy Course Bundle Access',
        description: `## Udemy — 30-Day Full Access Bundle

Get unlimited access to premium Udemy courses for 30 days. Learn programming, design, marketing, and more from top instructors.

### What's Included
- Access to 5,000+ premium courses
- Download for offline viewing
- Completion certificates
- Lifetime access to purchased courses after bundle
- Mobile app access

### Popular Topics
- Web Development (React, Node.js, Python)
- Data Science & Machine Learning  
- Digital Marketing & SEO
- UI/UX Design
- Business & Entrepreneurship

All courses include video lectures, coding exercises, and downloadable resources.`,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        minOrder: 1,
        price: 29.99,
        availability: false,
        tags: ['udemy', 'courses', 'education', 'learning', 'programming'],
        categoryId: education.id,
      },
    }),
  ])

  console.log(`✅ Created ${products.length} products`)
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
