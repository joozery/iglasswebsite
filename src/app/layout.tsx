import type { Metadata } from 'next';
import { Noto_Sans_Thai, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-thai',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'iGlass — แว่นตาพรีเมียม | Premium Eyewear Thailand',
  description: 'ร้านแว่นตาพรีเมียม ธีมเหลืองดำ วัสดุคุณภาพสูง บริการตัดเลนส์ครบวงจร',
  icons: {
    icon: '/logo/logobrowser.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${notoThai.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={`${notoThai.className} antialiased bg-white text-[#050505]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
