import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './(providers)/(root)/_components/Header';
import Footer from './(providers)/(root)/_components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeafyLink',
  description: 'LeafyLink'
};

function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
