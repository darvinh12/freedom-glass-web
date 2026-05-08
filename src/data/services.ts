export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  href: string;
  coverImage: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'residential-glass',
    title: 'Residential Glass Repair & Replacement',
    shortDesc: 'Expert repair and replacement for all residential glass — windows, doors, and more.',
    description:
      'Cracked window? Broken pane? Our technicians handle all residential glass repairs with speed and precision. We source the exact glass specifications for your home and restore clarity, security, and energy efficiency.',
    icon: '🏠',
    href: '/services#residential-glass',
    coverImage: '/assets/portfolio/windows/Windows-replacement-2-1.webp',
    features: [
      'Same-day emergency response',
      'All glass types and thicknesses',
      'Tempered, laminated & double-pane',
      'Weatherstripping & seal replacement',
    ],
  },
  {
    id: 'frameless-shower',
    title: 'Custom Frameless Shower Doors',
    shortDesc: 'Sleek, hardware-minimalist shower enclosures precision-crafted for your space.',
    description:
      'Our frameless shower doors are designed to elevate any bathroom. Using 3/8" and 1/2" tempered glass, we create 90°, 80°, and custom-angled enclosures that are easy to clean and built to last.',
    icon: '🚿',
    href: '/services#frameless-shower',
    coverImage: '/assets/portfolio/frameless-90/corner-showers-1.webp',
    features: [
      '90° and angled custom enclosures',
      '3/8" and 1/2" tempered glass',
      'Brushed nickel, matte black & chrome hardware',
      'Precision templating and installation',
    ],
  },
  {
    id: 'commercial-glass',
    title: 'Commercial Glass & Office Partitions',
    shortDesc: 'Modern glass partitions and storefronts for professional spaces.',
    description:
      'Transform your office or commercial space with glass partitions that combine transparency with privacy. We work with businesses of all sizes to create functional, modern work environments.',
    icon: '🏢',
    href: '/services#commercial-glass',
    coverImage: '/assets/portfolio/commercial/Commercial-Glass-1.webp',
    features: [
      'Floor-to-ceiling glass walls',
      'Frosted & privacy glass options',
      'Storefront glass and entrances',
      'Conference room enclosures',
    ],
  },
  {
    id: 'custom-mirrors',
    title: 'Custom Mirrors & Mirrored Walls',
    shortDesc: 'Bespoke mirrors cut to exact dimensions for any room.',
    description:
      'A well-placed mirror transforms a space. We fabricate custom mirrors in any shape and size — from bathroom vanity mirrors to full wall installations that double the visual depth of a room.',
    icon: '🪞',
    href: '/services#custom-mirrors',
    coverImage: '/assets/portfolio/mirrors/1-1.jpeg-scaled.webp',
    features: [
      'Cut to exact dimensions',
      'Frameless and framed options',
      'Beveled edges available',
      'Full-wall mirror installations',
    ],
  },
  {
    id: 'windows',
    title: 'Window Replacement',
    shortDesc: 'Energy-efficient window upgrades that improve comfort and curb appeal.',
    description:
      'Upgrade aging windows with modern, energy-efficient units. We handle full window replacement from single panes to multi-panel picture windows, matching your home\'s architectural style.',
    icon: '🪟',
    href: '/services#windows',
    coverImage: '/assets/portfolio/windows/42b1f654-2621-4314-af7d-b6a4cc8a7160.webp',
    features: [
      'Double and triple-pane insulated units',
      'Low-E coatings for Texas heat',
      'Vinyl, aluminum, and fiberglass frames',
      'Historic and custom shapes available',
    ],
  },
  {
    id: 'balustrades',
    title: 'Glass Balustrades & Railings',
    shortDesc: 'Frameless glass railings for stairs, balconies, and pool areas.',
    description:
      'Glass balustrades add elegance and openness to staircases, balconies, and outdoor areas. Our frameless railing systems are engineered for structural integrity and installed to code.',
    icon: '🏗️',
    href: '/services#balustrades',
    coverImage: '/assets/portfolio/frameless-doors/IMG_2729.jpeg-scaled.webp',
    features: [
      'Frameless and semi-frameless systems',
      'Stainless steel spigots and channels',
      'Pool fence compliant installations',
      'Indoor and outdoor grade glass',
    ],
  },
];
