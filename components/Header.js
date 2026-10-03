import { usePathname} from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();

  const navLinkStyle = (path) => ({
    background: pathname === path ? '#e7e5e4' : 'transparent',
  });

  return (
    <header className='header'>
      <div className="top-nav">
        <div className="nav-search">
          <form action="/search/max-results=5" method="get">
          <input aria-label="keyword" name="q" placeholder="Search Here" type="text" />
          <button aria-label="search" type="submit">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          </form>
        </div>
        </div>
      <nav className='navbar'>
        <ul>
          <li>
            <Link href="/" style={{...navLinkStyle('/'), fontWeight: 900}}>
              NGELAG.SITE
            </Link>
          </li>
          <li>
            <Link href="/admin" style={navLinkStyle('/admin')}>
              Admin
            </Link>
          </li>
          <li>
            <Link href="/tag/kecantikan" style={navLinkStyle('/tag/kecantikan')}>
              Kecantikan
            </Link>
          </li>
          <li>
            <Link href="/tag/perlengkapan" style={navLinkStyle('/tag/perlengkapan')}>
              Perlengkapan
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;