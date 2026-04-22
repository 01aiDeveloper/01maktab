import type { MarketProduct } from '@/types/market';

const galleryImages = [
  '/images/market/productImage.jpg',
  '/images/market/fc11384341fccf8afbe7b99e8eab4878a9400f3c.jpg',
  '/images/market/36659399c1838898b73ca91a3fa4eca5befc1317.png',
  '/images/market/427c5f3cfdec7def0ec8fb6871140f05da711477.png',
  '/images/market/c625fc9999adc3f6eb83662601bbabad0c80ea47.png',
];

const baseColors = [
  { id: 'black', hex: '#0A0A0A', name: 'Qora' },
  { id: 'white', hex: '#FFFFFF', name: 'Oq' },
];

const baseSizes = ['S', 'M', 'L', 'XL'] as const;

export const mockMarketProducts: MarketProduct[] = [
  {
    id: 'mlc-hoodie',
    title: 'MLC Худи',
    description:
      'Yumshoq paxtali fleece materialdan tikilgan unisex худи. Kunlik kiyim uchun qulay, MLC brending dizayni bilan.',
    priceSum: 300000,
    priceCoin: 2500,
    status: 'IN_STOCK',
    count: 14,
    images: galleryImages,
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-tshirt-classic',
    title: 'MLC Klassik Футболка',
    description:
      '100% paxta, 180gsm zichlikdagi klassik futbolka. Nafas oluvchi, kundalik kiyim uchun ideal.',
    priceSum: 150000,
    priceCoin: 1200,
    status: 'IN_STOCK',
    count: 30,
    images: [galleryImages[1], galleryImages[0], galleryImages[2]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-cap',
    title: 'MLC Бейсболка',
    description:
      'Brendlangan baseball kepkasi, sozlanadigan ortqi ramen, qattiq kozyrok.',
    priceSum: 0,
    priceCoin: 800,
    status: 'COIN_ONLY',
    count: 12,
    images: [galleryImages[2], galleryImages[0]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-sticker-pack',
    title: 'MLC Sticker Pack',
    description: '12 ta brendlangan vinil sticker — laptop, daftar, telefon uchun.',
    priceSum: 50000,
    priceCoin: 300,
    status: 'IN_STOCK',
    count: 100,
    images: [galleryImages[3], galleryImages[4]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-bottle',
    title: 'MLC Suv Idishi',
    description: "500ml zanglamaydigan po'lat termo idish, MLC logotipi bilan.",
    priceSum: 200000,
    priceCoin: 1500,
    status: 'OUT_OF_STOCK',
    count: 0,
    images: [galleryImages[4], galleryImages[1]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-backpack',
    title: 'MLC Рюкзак',
    description: "Laptopga mos, suv o'tkazmaydigan material, USB charger porti.",
    priceSum: 850000,
    priceCoin: 6000,
    status: 'SOON',
    count: 0,
    images: [galleryImages[2], galleryImages[3]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-notebook',
    title: 'MLC Daftar',
    description: 'A5 formatdagi premium daftar, qattiq muqova, 200 sahifa, MLC dizayni.',
    priceSum: 80000,
    priceCoin: 500,
    status: 'IN_STOCK',
    count: 45,
    images: [galleryImages[1], galleryImages[2]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
  {
    id: 'mlc-mug',
    title: 'MLC Кружка',
    description: "350ml seramik kruzhka, ikki tomonlama MLC logotipi, mikroto'lqinda issiq.",
    priceSum: 0,
    priceCoin: 600,
    status: 'COIN_ONLY',
    count: 25,
    images: [galleryImages[4], galleryImages[3]],
    colors: baseColors,
    sizes: [...baseSizes],
  },
];

export function getMockProductById(id: string): MarketProduct | undefined {
  return mockMarketProducts.find((p) => p.id === id);
}
