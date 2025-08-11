import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Afripay',
  description: 'Mobile Payment for Africa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}