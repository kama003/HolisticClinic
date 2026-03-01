import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chandigarh Holistic Clinic',
  description: 'Nature Has A Way of Living. Consult us Today!!!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#f2f2f2] text-[#333]">
        {children}
      </body>
    </html>
  );
}
