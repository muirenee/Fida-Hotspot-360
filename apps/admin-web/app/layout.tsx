import type { ReactNode } from 'react';
export const metadata = { title: 'Fida Hotspot 360', description: 'Hotel guest internet management' };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f7f9fc', color: '#10243b' }}>{children}</body></html>;
}
