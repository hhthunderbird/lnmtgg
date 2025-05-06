export {};

declare global {
  interface Window {
    adsbygoogle?: {
      push: (arg: unknown) => void;
    }[];
  }
}