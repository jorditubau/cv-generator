import { CVData } from '../types/cv.types';

export function encodeCVToUrl(cvData: CVData): string {
  try {
    const json = JSON.stringify(cvData);
    const encoded = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.hash = `cv=${encoded}`;
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function decodeCVFromUrl(): CVData | null {
  try {
    const hash = window.location.hash;
    if (!hash.startsWith('#cv=')) return null;
    const encoded = hash.slice(4);
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as CVData;
  } catch {
    return null;
  }
}
