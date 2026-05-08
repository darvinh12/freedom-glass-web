export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    author: 'Maria R.',
    rating: 5,
    text: 'Freedom Glass did an amazing job on our master bathroom frameless shower. The quality is exceptional and they finished ahead of schedule. Highly recommend!',
    date: '2024-03-15',
  },
  {
    author: 'John D.',
    rating: 5,
    text: 'Professional team, great price, and beautiful results. Our frameless shower enclosure looks stunning. Will definitely use them again for our office renovation.',
    date: '2024-02-08',
  },
  {
    author: 'Sandra M.',
    rating: 5,
    text: 'They installed a custom mirror wall in our gym and it looks incredible. The installation was quick and clean. 10/10 service.',
    date: '2024-01-22',
  },
  {
    author: 'Carlos V.',
    rating: 5,
    text: 'Excellent communication from start to finish. They measured twice, cut once — our custom glass table tops fit perfectly. Very satisfied.',
    date: '2023-12-10',
  },
  {
    author: 'Jennifer L.',
    rating: 5,
    text: 'I got quotes from 3 companies and Freedom Glass offered the best combination of quality and price. The glass partitions in our office look modern and professional.',
    date: '2023-11-05',
  },
  {
    author: 'Robert K.',
    rating: 5,
    text: 'Fast response, fair pricing, and flawless execution on our window replacement project. The new double-pane windows have made a noticeable difference in our energy bills.',
    date: '2023-10-18',
  },
];

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Freedom Glass Remodeling LLC",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "40",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": reviews.map(r => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.author },
    "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": "5" },
    "reviewBody": r.text,
    "datePublished": r.date
  }))
};
