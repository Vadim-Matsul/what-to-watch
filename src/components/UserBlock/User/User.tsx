import { useSelector } from 'react-redux'
import Image from 'next/image';
import Link from 'next/link';
import { bePagesPaths } from '../../../helpers/const/const';
import { getUser } from '../../../store/reducers/index.selectors';

export const User: React.FC = () => {
  const user = useSelector(getUser)!;

  return (
    <Link href={bePagesPaths.favorite} >
      <a>
        <div className="user-block__avatar">
          <Image
            src={user.avatarUrl}
            blurDataURL={user.avatarUrl}
            width={63}
            height={63}
            placeholder='blur'
          />
        </div>
      </a>
    </Link>
  );
};
