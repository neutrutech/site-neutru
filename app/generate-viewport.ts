export function generateViewport() {
  return {
    // themeColor handled here to satisfy Next.js requirements
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
  };
}
