import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FavoritesStatus } from '../../../helpers/const/const';
import { useAppDispatch } from '../../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../../store/labouring/api-actions/api-actions';
import { getActiveFavId } from '../../../store/reducers/index.selectors';
import { movieFavoriteData } from '../../../types/movies';


export const Trash: React.FC = () => {
  const startId = useSelector(getActiveFavId);
  const dispatch = useAppDispatch();
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDelete = async (evt: React.DragEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    const svg = svgRef.current!;
    const DATA: movieFavoriteData = { id: startId, status: FavoritesStatus.DELETE }
    await dispatch(API_ACTIONS.changeFavorites(DATA));
    svg.setAttribute('class', '')
  };

  const handleDragOver = (evt: React.DragEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    const svg = svgRef.current!;
    svg.setAttribute('class', 'trash-over')
  };

  const handleDragLeave = (evt: React.DragEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    const svg = svgRef.current!;
    svg.setAttribute('class', '')
  };


  return (
    <div
      onDrop={handleDelete}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className='trash'
      data-testid='trash'
    >
      <svg
        width="80px"
        height="80px"
        viewBox="0 0 1280 1280"
        ref={svgRef}
        data-testid='svg'
      >
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="rgb(165 44 16 / 70%)" stroke="none">
          <path d="M1320 12475 l0 -325 5075 0 5075 0 0 325 0 325 -5075 0 -5075 0 0 -325z" />
          <path d="M1700 11665 c0 -3 30 -242 66 -531 36 -289 64 -528 62 -529 -2 -2 -338 185 -748 416 -409 230 -748 415 -751 411 -11 -12 -330 -555 -327 -557 2 -1 429 -241 950 -534 521 -293 954 -538 963 -545 14 -10 30 -114 85 -562 72 -578 226 -1816 435 -3497 69 -554 195 -1566 279 -2250 85 -683 187 -1504 227 -1825 l72 -582 219 0 c124 0 218 4 218 9 0 9 -56 598 -140 1466 -22 231 -63 653 -90 938 -28 284 -72 751 -100 1037 -27 286 -72 753 -100 1038 -27 284 -68 706 -90 937 -22 231 -63 653 -90 938 -28 284 -72 751 -100 1037 -27 286 -72 753 -100 1038 -27 284 -70 729 -95 987 -25 259 -59 616 -76 795 -16 179 -32 335 -35 348 l-4 22 -365 0 c-201 0 -365 -2 -365 -5z" />
          <path d="M3124 11618 c4 -29 15 -172 26 -318 21 -287 102 -1357 150 -1985 16 -214 52 -688 80 -1052 27 -365 73 -961 100 -1325 28 -365 64 -838 80 -1053 38 -505 125 -1645 150 -1985 11 -146 25 -321 30 -390 6 -69 33 -424 60 -790 28 -366 59 -780 70 -920 10 -140 26 -354 35 -475 9 -121 18 -226 20 -232 3 -10 102 -13 450 -13 l445 0 -6 58 c-5 59 -197 2750 -544 7647 -111 1562 -204 2850 -206 2863 l-4 22 -471 0 -470 0 5 -52z" />
          <path d="M4974 11488 c3 -101 15 -475 26 -833 18 -608 30 -989 80 -2625 11 -355 29 -944 40 -1310 11 -366 29 -957 40 -1315 11 -357 24 -794 30 -970 5 -176 19 -619 30 -985 46 -1506 60 -1965 66 -2162 l7 -208 428 0 c235 0 429 3 431 8 2 4 -2 263 -8 577 -7 314 -17 820 -23 1125 -6 305 -16 762 -21 1015 -5 253 -14 687 -20 965 -6 278 -15 721 -20 985 -5 264 -14 705 -20 980 -6 275 -15 716 -20 980 -5 264 -14 705 -20 980 -6 275 -15 716 -20 980 -5 264 -14 705 -20 980 -5 275 -12 616 -16 758 l-6 257 -486 0 -485 0 7 -182z" />
          <path d="M6846 11568 c-3 -57 -10 -362 -16 -678 -6 -316 -15 -782 -20 -1035 -10 -493 -22 -1056 -60 -2940 -6 -275 -15 -716 -20 -980 -5 -264 -14 -705 -20 -980 -6 -275 -15 -716 -20 -980 -5 -264 -14 -700 -20 -970 -5 -269 -14 -717 -20 -995 -5 -278 -12 -601 -16 -718 l-6 -212 441 0 441 0 0 83 c0 45 7 293 15 552 8 259 24 769 35 1135 37 1229 60 1963 70 2285 5 176 19 619 30 985 11 366 29 955 40 1310 71 2339 96 3151 110 3610 5 184 13 401 16 483 l6 147 -490 0 -490 0 -6 -102z" />
          <path d="M8663 10652 c-545 -7643 -673 -9447 -679 -9504 l-6 -68 446 0 446 0 4 23 c3 12 16 180 31 372 14 193 48 645 75 1005 27 360 72 954 100 1320 27 366 54 721 60 790 6 69 28 366 50 660 22 294 44 591 50 660 6 69 33 424 60 790 27 366 54 721 60 790 6 69 28 366 50 660 22 294 44 591 50 660 10 126 68 896 160 2113 27 364 51 681 53 705 l5 42 -472 0 -471 0 -72 -1018z" />
          <path d="M10322 11223 c-23 -247 -69 -725 -102 -1063 -77 -795 -217 -2253 -280 -2912 -131 -1358 -152 -1581 -190 -1973 -22 -231 -63 -653 -90 -937 -28 -285 -72 -751 -100 -1035 -27 -285 -65 -684 -85 -888 -20 -203 -56 -578 -80 -832 -25 -254 -45 -471 -45 -482 0 -21 5 -21 215 -21 l214 0 6 33 c3 17 37 286 75 597 66 535 121 985 345 2785 53 424 125 1004 160 1290 35 286 123 993 195 1570 72 578 169 1361 216 1740 47 380 88 693 92 696 4 3 439 248 967 544 528 296 961 539 963 540 5 4 -328 560 -336 560 -4 0 -342 -188 -750 -418 -409 -231 -745 -417 -746 -415 -1 1 26 228 60 503 34 275 64 515 66 533 l4 32 -366 0 -366 0 -42 -447z" />
          <path d="M2670 325 l0 -325 3695 0 3695 0 0 325 0 325 -3695 0 -3695 0 0 -325z" />
        </g>
      </svg>
    </div>
  );
};
