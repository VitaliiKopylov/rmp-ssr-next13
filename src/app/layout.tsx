import Link from 'next/link';
import Image from 'next/image';

import '@/assets/styles/vars.css';
import '@/assets/styles/typography.css';
import '@/app.scss';
import '@/index.css';
import logo from '@/assets/images/logo.svg';

export const metadata = {
  title: 'RMP Next13',
  description: 'NextRoulette Next13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app">
        <header className="app__header">
          <div className="app__header-container container">
            <Link href="/">
              <Image src={logo} alt="App" />
            </Link>
            <Link className="add-btn" href="/new">
              + add movie
            </Link>
          </div>
        </header>
        <div className="app__main">{children}</div>
        <footer className="app__footer">
          <div className="app__footer-container container">
            <a href="/">
              <Image src={logo} alt="App" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
