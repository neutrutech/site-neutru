import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openEmail(subject?: string, body?: string) {
  try {
    const to = 'neutru.tech@gmail.com';
    const s = encodeURIComponent(subject || (typeof document !== 'undefined' ? document.title : 'Contacto'));
    const b = body ? `&body=${encodeURIComponent(body)}` : '';
    window.location.href = `mailto:${to}?subject=${s}${b}`;
  } catch (e) {
    // no-op
  }
}
