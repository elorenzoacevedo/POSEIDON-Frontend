import type { AppProps } from 'next/app';
import NavBar from '@/components/Navbar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
};

export default App;
