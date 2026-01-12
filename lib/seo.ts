import type { Metadata } from 'next';

const SITE_NAME = 'NEUTRU';
const BASE_URL = 'https://neutru.tech';
const DEFAULT_IMAGE = '/og-image.png';

export type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export function pageMetadata(input: PageMetaInput): Metadata {
  const title = input.title ? `${input.title} | ${SITE_NAME}` : SITE_NAME;
  const description = input.description ||
    'NEUTRU — design e engenharia de produto digital. Criamos sites, plataformas e experiências digitais rápidas e escaláveis para empresas.';
  const url = `${BASE_URL}${input.path || '/'} `;
  const image = input.image || DEFAULT_IMAGE;
  const keywords = input.keywords || ['NEUTRU', 'agência digital', 'design', 'desenvolvimento web'];

  return {
    title: title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: url.trim(),
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      locale: 'pt-PT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  } as Metadata;
}

export default pageMetadata;
