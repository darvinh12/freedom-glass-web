export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  label: string;
  serviceId: string;
  images: PortfolioImage[];
}

const basePath = '/assets/portfolio';

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'frameless-90',
    name: 'Frameless Shower Enclosure 90°',
    label: '90° Enclosures',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/frameless-90/1633fbe6-4376-4198-88c3-c63d2b363840.jpeg.webp`, alt: 'Frameless 90° shower enclosure' },
      { src: `${basePath}/frameless-90/corner-showers-1.webp`, alt: 'Corner shower frameless glass' },
      { src: `${basePath}/frameless-90/corner-showers-2.webp`, alt: 'Corner shower 90 degree' },
      { src: `${basePath}/frameless-90/corner-showers-3.webp`, alt: 'Frameless corner shower door' },
      { src: `${basePath}/frameless-90/corner-showers-5.webp`, alt: 'Glass shower enclosure 90°' },
      { src: `${basePath}/frameless-90/IMG-20231031-WA0005.webp`, alt: 'Custom shower door installation' },
      { src: `${basePath}/frameless-90/IMG-20231031-WA0009.webp`, alt: 'Frameless shower glass Dallas' },
      { src: `${basePath}/frameless-90/IMG-20231031-WA0010.webp`, alt: 'Shower enclosure installation TX' },
      { src: `${basePath}/frameless-90/IMG-20231031-WA0011.webp`, alt: 'Custom glass shower door' },
      { src: `${basePath}/frameless-90/IMG-20231031-WA0015.webp`, alt: 'Modern frameless shower' },
      { src: `${basePath}/frameless-90/IMG_2351-scaled.jpeg.webp`, alt: 'Bathroom glass enclosure' },
      { src: `${basePath}/frameless-90/IMG_3296-scaled.jpeg.webp`, alt: 'Premium shower glass' },
      { src: `${basePath}/frameless-90/IMG_6393.jpeg-scaled.webp`, alt: 'Freedom Glass shower door' },
      { src: `${basePath}/frameless-90/IMG_7786.jpeg.webp`, alt: 'Luxury frameless shower' },
      { src: `${basePath}/frameless-90/IMG_8014.jpeg.webp`, alt: 'Contemporary glass enclosure' },
      { src: `${basePath}/frameless-90/IMG_8413.jpeg.webp`, alt: 'Frameless shower door DFW' },
    ],
  },
  {
    id: 'frameless-80',
    name: 'Frameless Shower Enclosure 80°',
    label: '80° Enclosures',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/frameless-80/1237999a-eacf-4958-9e21-57518c81bb1d.jpeg.webp`, alt: '80° frameless shower enclosure' },
      { src: `${basePath}/frameless-80/55cb5fa3-4b4f-4eed-9d31-2bd0f6eb76a0.jpeg.webp`, alt: 'Angled shower glass door' },
      { src: `${basePath}/frameless-80/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.21-scaled-1.webp`, alt: 'Custom 80° shower installation' },
      { src: `${basePath}/frameless-80/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.22-1.webp`, alt: 'Frameless shower glass 80°' },
      { src: `${basePath}/frameless-80/IMG_3442-rotated.jpeg-1-scaled.webp`, alt: 'Custom 80 degree shower door' },
      { src: `${basePath}/frameless-80/IMG_5982.jpeg-1-scaled.webp`, alt: 'Modern glass shower enclosure' },
      { src: `${basePath}/frameless-80/IMG_6314-rotated.jpeg-1-scaled.webp`, alt: 'Glass shower Dallas TX' },
      { src: `${basePath}/frameless-80/IMG_7501-rotated.jpeg-scaled.webp`, alt: 'Bathroom frameless glass' },
      { src: `${basePath}/frameless-80/IMG_7639-rotated.jpeg-scaled.webp`, alt: 'Custom shower installation Dallas' },
      { src: `${basePath}/frameless-80/IMG_7899.jpeg.webp`, alt: 'Frameless shower 80°' },
    ],
  },
  {
    id: 'angled-showers',
    name: 'Custom Angled Showers',
    label: 'Angled Showers',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/angled/Angled-showers-1.jpeg.webp`, alt: 'Custom angled shower door' },
      { src: `${basePath}/angled/Custom-angled-showers-2.webp`, alt: 'Angled glass shower enclosure' },
      { src: `${basePath}/angled/IMG_1829.jpeg.webp`, alt: 'Custom angle shower installation' },
      { src: `${basePath}/angled/IMG_3379-scaled.jpeg.webp`, alt: 'Unique shower glass design' },
      { src: `${basePath}/angled/IMG_8199-1.jpeg.webp`, alt: 'Premium angled shower glass' },
      { src: `${basePath}/angled/IMG_3217-scaled.jpeg.webp`, alt: 'Angled glass shower Dallas' },
    ],
  },
  {
    id: 'sliding-showers',
    name: 'Sliding Shower Doors',
    label: 'Sliding Doors',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/sliding/6a551f46-4f47-4e44-b956-86e3a6eb64e7.jpeg.webp`, alt: 'Sliding shower glass door' },
      { src: `${basePath}/sliding/Imagen-de-WhatsApp-2023-11-18-a-las-17.31.30_7952384a.webp`, alt: 'Custom sliding shower' },
      { src: `${basePath}/sliding/IMG_7688-scaled.jpeg.webp`, alt: 'Frameless sliding shower door' },
    ],
  },
  {
    id: 'steam-showers',
    name: 'Full Height Steam Showers',
    label: 'Steam Showers',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/steam/Full-HEIGHT-Steam-showers-1-1-1.jpeg.webp`, alt: 'Full height steam shower glass' },
      { src: `${basePath}/steam/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.15-scaled-1.webp`, alt: 'Steam shower enclosure custom' },
      { src: `${basePath}/steam/IMG_5682.jpeg.webp`, alt: 'Premium steam shower installation' },
    ],
  },
  {
    id: 'tub-glass',
    name: 'Glass For Tub',
    label: 'Tub Glass',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/tub/1f0c396d-eb8b-4d2c-9583-fbe27e2fba3c-1.jpeg.webp`, alt: 'Glass tub enclosure' },
      { src: `${basePath}/tub/53d5249c-daab-49f9-b39d-7ef18820b58b.jpeg.webp`, alt: 'Bathtub glass door' },
      { src: `${basePath}/tub/IMG_1945.jpeg.webp`, alt: 'Custom glass for bathtub' },
      { src: `${basePath}/tub/IMG_4793-1.jpeg.webp`, alt: 'Tub shower glass Dallas' },
      { src: `${basePath}/tub/IMG_3668-1.jpeg.webp`, alt: 'Glass tub enclosure DFW' },
    ],
  },
  {
    id: 'mirrors',
    name: 'Custom Mirrors',
    label: 'Custom Mirrors',
    serviceId: 'custom-mirrors',
    images: [
      { src: `${basePath}/mirrors/1-1.jpeg-scaled.webp`, alt: 'Custom bathroom mirror' },
      { src: `${basePath}/mirrors/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.36-1-scaled-1.webp`, alt: 'Large custom mirror wall' },
      { src: `${basePath}/mirrors/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.36-scaled-1.webp`, alt: 'Frameless wall mirror' },
      { src: `${basePath}/mirrors/IMG_2428.jpeg.webp`, alt: 'Mirror installation Texas' },
      { src: `${basePath}/mirrors/custom-mirrors-3.webp`, alt: 'Custom mirror design' },
      { src: `${basePath}/mirrors/custom-mirrors-4.webp`, alt: 'Modern wall mirror' },
      { src: `${basePath}/mirrors/IMG_8039-rotated.jpeg.webp`, alt: 'Custom mirror Dallas TX' },
    ],
  },
  {
    id: 'fixed-panels',
    name: 'Fixed Panels',
    label: 'Fixed Panels',
    serviceId: 'frameless-shower',
    images: [
      { src: `${basePath}/fixed/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.16-scaled-1.webp`, alt: 'Fixed glass panel shower' },
      { src: `${basePath}/fixed/IMG_6257.jpeg.webp`, alt: 'Stationary glass panel' },
      { src: `${basePath}/fixed/IMG_7549.jpeg-scaled.webp`, alt: 'Custom fixed shower panel' },
    ],
  },
  {
    id: 'commercial',
    name: 'Glass Partitions Office',
    label: 'Commercial',
    serviceId: 'commercial-glass',
    images: [
      { src: `${basePath}/commercial/Commercial-Glass-1.webp`, alt: 'Office glass partition Dallas' },
      { src: `${basePath}/commercial/Commercial-Glass-2.webp`, alt: 'Commercial glass wall TX' },
      { src: `${basePath}/commercial/Commercial-Glass-3.webp`, alt: 'Glass office partition' },
      { src: `${basePath}/commercial/Commercial-Glass-5.webp`, alt: 'Modern office glass dividers' },
      { src: `${basePath}/commercial/Commercial-Glass-6.webp`, alt: 'Floor to ceiling glass wall' },
      { src: `${basePath}/commercial/e488f5d1-be64-474e-86b2-0283aab6da37.jpeg.webp`, alt: 'Commercial glass installation' },
      { src: `${basePath}/commercial/IMG_7845-rotated.jpeg.webp`, alt: 'Office glass partition DFW' },
    ],
  },
  {
    id: 'frameless-doors',
    name: 'Frameless Glass Doors',
    label: 'Glass Doors',
    serviceId: 'residential-glass',
    images: [
      { src: `${basePath}/frameless-doors/IMG_2729.jpeg-scaled.webp`, alt: 'Frameless glass door' },
      { src: `${basePath}/frameless-doors/IMG_2958-scaled.jpeg.webp`, alt: 'Custom glass entrance door' },
      { src: `${basePath}/frameless-doors/IMG_5641-1-rotated.jpeg.webp`, alt: 'Interior frameless glass door' },
      { src: `${basePath}/frameless-doors/IMG_6841.jpeg-scaled.webp`, alt: 'Frameless door installation TX' },
      { src: `${basePath}/frameless-doors/IMG_7255.jpeg-scaled.webp`, alt: 'Custom glass door Dallas' },
    ],
  },
  {
    id: 'shelving',
    name: 'Shelving Glass',
    label: 'Glass Shelves',
    serviceId: 'residential-glass',
    images: [
      { src: `${basePath}/shelving/IMG_7038.jpeg-scaled.webp`, alt: 'Custom glass shelving' },
      { src: `${basePath}/shelving/2b9ebff5-5b53-4bd3-9ed5-f85b589e6a11.jpeg.webp`, alt: 'Glass shelf installation' },
      { src: `${basePath}/shelving/IMG_6963.jpeg.webp`, alt: 'Floating glass shelves' },
      { src: `${basePath}/shelving/IMG_8373.jpeg.webp`, alt: 'Custom glass display shelves' },
      { src: `${basePath}/shelving/f9da5e4c-0b2e-4ce5-a032-21c8f7a69c63.jpeg.webp`, alt: 'Glass shelving Dallas TX' },
    ],
  },
  {
    id: 'furniture-tops',
    name: 'Custom Glass Furniture Tops',
    label: 'Furniture Tops',
    serviceId: 'residential-glass',
    images: [
      { src: `${basePath}/furniture/0eeef76a-6646-4953-99d3-a811ff827c5b.jpeg.webp`, alt: 'Glass table top custom' },
      { src: `${basePath}/furniture/IMG-20231031-WA0014-1.webp`, alt: 'Custom glass furniture top' },
      { src: `${basePath}/furniture/IMG_9050-1-scaled.jpeg.webp`, alt: 'Glass desk top installation' },
      { src: `${basePath}/furniture/IMG_9051-scaled.jpeg.webp`, alt: 'Custom glass countertop' },
      { src: `${basePath}/furniture/IMG_3227-scaled.jpeg.webp`, alt: 'Glass furniture top Dallas' },
    ],
  },
  {
    id: 'wine-rooms',
    name: 'Wine Rooms',
    label: 'Wine Rooms',
    serviceId: 'commercial-glass',
    images: [
      { src: `${basePath}/wine-rooms/Custom-wine-rooms-3-rotated.jpeg.webp`, alt: 'Custom glass wine room' },
      { src: `${basePath}/wine-rooms/Imagen-de-WhatsApp-2024-05-06-a-las-20.36.12_3d2c0632.webp`, alt: 'Wine cellar glass enclosure' },
      { src: `${basePath}/wine-rooms/Custom-wine-rooms-1-1.jpeg.webp`, alt: 'Glass wine room installation' },
      { src: `${basePath}/wine-rooms/Custom-wine-rooms-2-1.jpeg.webp`, alt: 'Custom wine cellar glass' },
    ],
  },
  {
    id: 'hutch-cabinets',
    name: 'Hutch Glass Cabinets',
    label: 'Cabinets',
    serviceId: 'residential-glass',
    images: [
      { src: `${basePath}/hutch/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.36-2-scaled-1.webp`, alt: 'Glass hutch cabinet' },
      { src: `${basePath}/hutch/IMG_2916-scaled.jpeg.webp`, alt: 'Custom glass cabinet doors' },
    ],
  },
  {
    id: 'windows',
    name: 'Windows Replacement',
    label: 'Windows',
    serviceId: 'windows',
    images: [
      { src: `${basePath}/windows/42b1f654-2621-4314-af7d-b6a4cc8a7160.jpeg.webp`, alt: 'Window replacement Dallas TX' },
      { src: `${basePath}/windows/Windows-replacement-2-1.jpeg.webp`, alt: 'Energy efficient window installation' },
      { src: `${basePath}/windows/Windows-replacement-1-1.jpeg.webp`, alt: 'Residential window replacement TX' },
    ],
  },
];

export const allImages = portfolioCategories.flatMap(cat =>
  cat.images.map(img => ({ ...img, category: cat.id, categoryName: cat.name }))
);
