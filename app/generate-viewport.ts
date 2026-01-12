export function generateViewport() {
  return {
    // themeColor handled here to satisfy Next.js requirements
    themeColor: [
      // Force dark theme color for both light/dark prefers-color-scheme
      { media: '(prefers-color-scheme: light)', color: '#000000' },
      { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
  };
}
