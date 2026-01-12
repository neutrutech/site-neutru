import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Nav";
import WhatsAppButton from "@/Components/WhatsAppButton";
import ProcessingOverlay from "@/Components/ProcessingOverlay";
import ScrollToTopButton from "@/Components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neutru.io'),
  title: {
    default: 'NEUTRU — Agência de Produto Digital',
    template: '%s | NEUTRU',
  },
  description:
    'NEUTRU — design e engenharia de produto digital. Criamos sites, plataformas e experiências digitais rápidas e escaláveis para empresas que querem crescer.',
  keywords: [
    'NEUTRU',
    'agência digital',
    'design de produto',
    'desenvolvimento web',
    'next.js',
    'UX',
    'UI',
    'software sob medida',
  ],
  authors: [
    {
      name: 'NEUTRU',
      url: 'https://neutru.io',
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // themeColor moved to app/generate-viewport.ts per Next.js recommendation
  openGraph: {
    title: 'NEUTRU — Agência de Produto Digital',
    description:
      'Design e engenharia de produto digital — sites, plataformas e experiências rápidas e escaláveis para empresas.',
    url: 'https://neutru.io',
    siteName: 'NEUTRU',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEUTRU — design e engenharia de produto digital',
        type: 'image/png',
      },
    ],
    locale: 'pt-PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEUTRU — Agência de Produto Digital',
    description:
      'Design e engenharia de produto digital — sites, plataformas e experiências rápidas e escaláveis para empresas.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        'name': 'NEUTRU',
        'url': 'https://neutru.io',
        'logo': 'https://neutru.io/logo.png',
        'sameAs': [],
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'email': 'neutru.tech@gmail.com',
            'contactType': 'customer support',
          },
        ],
      },
      {
        '@type': 'WebSite',
        'url': 'https://neutru.io',
        'name': 'NEUTRU',
        'publisher': { '@type': 'Organization', 'name': 'NEUTRU' },
      },
    ],
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} antialiased`}
      >
        <Nav />
        <ProcessingOverlay />
        <WhatsAppButton />
        <ScrollToTopButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
