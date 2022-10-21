import Link from 'next/link';
import { FooterProps } from './Footer.props';
import { LogoLink } from './LogoLink/LogoLink';
import { Trash } from './Trash/Trash';


export const Footer: React.FC<FooterProps> = ({ shouldShowTrash = false }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="page-footer">
      {shouldShowTrash && <Trash />}
      <LogoLink isLight />
      <div className="copyright">
        <p>© {year} What to watch Ltd.</p>
      </div>
    </footer>
  );
};
