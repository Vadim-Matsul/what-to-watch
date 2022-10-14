import Link from 'next/link';
import { LogoLink } from './LogoLink/LogoLink';


export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <LogoLink isLight />
      <div className="copyright">
        <p>© {year} What to watch Ltd.</p>
      </div>
    </footer>
  );
};
