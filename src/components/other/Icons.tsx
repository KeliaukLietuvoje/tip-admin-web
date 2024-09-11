import { AiFillPicture, AiFillPlusCircle, AiOutlineEye, AiOutlineMail } from 'react-icons/ai';
import { BiCalendarEvent, BiMinusCircle, BiSearchAlt2, BiTrash } from 'react-icons/bi';
import { FiPhone, FiUser, FiUsers } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { IoIosArrowDown, IoMdCalendar } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdBusiness,
  MdDone,
  MdEmail,
  MdExitToApp,
  MdGroups,
  MdKeyboardArrowDown,
  MdMoreVert,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdOutlineInsertPhoto,
  MdOutlineNorthEast,
  MdOutlinePerson,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdSettings,
  MdTune,
  MdUnfoldMore,
  MdViewModule,
} from 'react-icons/md';
import { RiArrowDownSLine, RiMap2Fill } from 'react-icons/ri';
import { TiArrowSortedDown, TiThMenu } from 'react-icons/ti';
export interface IconProps {
  name: string;
  className?: string;
  color?: string;
  height?: string;
  width?: string;
  fun?: () => void;
}

const Icon = ({ name, className, height, width, color }: IconProps) => {
  switch (name) {
    case 'logoWhite':
      return (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x={0}
          y={0}
          viewBox="0 0 1083 505"
          className={className}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <polygon
                  points="532.5,288.5 387.1,82.8 386.8,82.3 364.1,82.3 364.1,303.4 378.8,303.4 379.4,97 525.1,303 525.4,303.4 
             547.2,303.4 547.2,82.3 532.5,82.3 			"
                  fill="#FFFFFF"
                />
                <polygon
                  points="581.7,96 657.5,96 657.5,303.4 672.2,303.4 672.2,96 748.2,96 748.2,82.3 581.7,82.3 			"
                  fill="#FFFFFF"
                />
                <rect x="787.1" y="82.3" width="14.7" height="221.1" fill="#FFFFFF" />
                <path
                  d="M938,178.8c-42.6-4.1-62.4-18.6-62.4-45.8c0-24.3,24-41.3,58.5-41.3c31,0,55.3,19.7,63.5,51.3l0.3,1.1l15-4.8l-0.3-1
             c-9.6-36.6-40.4-60.3-78.5-60.3c-42.6,0-73.5,23-73.5,54.6c0,36.4,23.2,55.9,72.9,61.2c48.1,5,71.5,20.9,71.5,48.7
             c0,31.1-26.8,52-66.6,52c-40.4,0-70.4-26.5-78.2-69.2l-0.2-1.2l-15.2,4.1l0.2,1c8.8,48,45.5,79,93.4,79c49.6,0,81.6-25.9,81.6-66
             C1020,204.7,993.9,184.6,938,178.8z"
                  fill="#FFFFFF"
                />
              </g>
              <path
                d="M288.3,174.4v-27.2c0-0.2,0-0.3,0-0.5c-0.2-6.5-3.6-12.4-9.4-16.8l-82.3-61.4c-11.7-8.7-30-8.7-41.7,0l-82.3,61.4
           c-5.9,4.4-9.2,10.3-9.4,16.8c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5c0,0.7,0.1,1.3,0.2,2c-0.1,0.7-0.2,1.3-0.2,2
           c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5c0,0.7,0.1,1.3,0.2,2c-0.1,0.7-0.2,1.3-0.2,2c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5
           c0.2,6.5,3.6,12.4,9.4,16.8l82.3,61.4c5.8,4.4,13.3,6.5,20.8,6.5s15-2.2,20.8-6.5l82.3-61.4c6-4.4,9.3-10.5,9.4-17.1l0,0
           c0-0.1,0-0.2,0-0.4v-27.2c0-0.2,0-0.3,0-0.5c0-0.7-0.1-1.3-0.2-1.9c0.1-0.8,0.2-1.5,0.2-2.3c0-0.1,0-0.3,0-0.4v-27.2
           c0-0.2,0-0.3,0-0.5c0-0.7-0.1-1.3-0.2-1.9c0.1-0.8,0.2-1.5,0.2-2.3C288.3,174.6,288.3,174.5,288.3,174.4z M277,193.2l0.6-0.4v0.8
           L277,193.2z M272.4,183.2l-4.4,3.3l-71.5-53.3c-11.7-8.7-30-8.7-41.7,0l-71.5,53.3l-4.4-3.3c-2.4-1.8-4-3.9-4.7-6.2
           c0.7-2.3,2.3-4.4,4.7-6.2l82.3-61.4c7.8-5.8,21-5.8,28.9,0l82.3,61.4c2.4,1.8,4,3.9,4.7,6.2C276.4,179.3,274.8,181.4,272.4,183.2z
            M259,193.2l-69,51.4c-7.8,5.8-21,5.8-28.9,0l-69-51.4l69-51.4c7.8-5.8,21-5.8,28.9,0L259,193.2z M73.8,192.8l0.6,0.4l-0.6,0.4
           V192.8z M78.9,203.2l4.4-3.3l71.5,53.3c5.8,4.4,13.3,6.5,20.8,6.5s15-2.2,20.8-6.5l71.5-53.3l4.4,3.3c2.4,1.8,4,3.9,4.7,6.2
           c-0.7,2.3-2.3,4.4-4.7,6.2l-82.3,61.4c-7.8,5.8-21,5.8-28.9,0l-82.3-61.4c-2.4-1.8-4-3.9-4.7-6.2
           C74.9,207.1,76.5,204.9,78.9,203.2z M73.8,147.3c0-3.2,1.9-6.3,5.1-8.7l82.3-61.4c7.8-5.8,21-5.8,28.9,0l82.3,61.4
           c3.3,2.4,5.1,5.5,5.1,8.7c0,0.1,0,0.2,0,0.3v13.7l-81.1-60.4c-11.7-8.7-30-8.7-41.7,0l-81.1,60.4v-13.7
           C73.8,147.5,73.8,147.4,73.8,147.3z M277.5,239.1c0,3.2-1.9,6.3-5.1,8.7l-82.3,61.4c-7.8,5.8-21,5.8-28.9,0l-82.3-61.4
           c-3.3-2.4-5.1-5.5-5.1-8.7c0-0.1,0-0.2,0-0.3v-13.7l81.1,60.4c5.8,4.4,13.3,6.5,20.8,6.5c7.5,0,15-2.2,20.8-6.5l81.1-60.4v13.7
           C277.5,238.9,277.5,239,277.5,239.1z"
                fill="#FFFFFF"
              />
            </g>
            <g>
              <path d="M428.2,364.9V375h-25.8v68h-10.6v-68h-25.7v-10.2H428.2z" fill="#FFFFFF" />
              <path d="M454.1,364.9V443h-10.6v-78.1H454.1z" fill="#FFFFFF" />
              <path
                d="M508,364.9c15.2,0,24,9.7,24,22.9c0,13.4-8.7,23-24,23h-22.9V443h-10.6v-78.1H508z M521.4,387.8c0-7.7-4.8-12.7-13.8-12.7
           h-22.4v25.4h22.4C516.6,400.5,521.4,395.6,521.4,387.8z"
                fill="#FFFFFF"
              />
            </g>
          </g>
        </svg>
      );
    case 'logo':
      return (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x={0}
          y={0}
          viewBox="0 0 1083 505"
          className={className}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <polygon
                  points="532.5,288.5 387.1,82.8 386.8,82.3 364.1,82.3 364.1,303.4 378.8,303.4 379.4,97 525.1,303 525.4,303.4 
             547.2,303.4 547.2,82.3 532.5,82.3 			"
                />
                <polygon points="581.7,96 657.5,96 657.5,303.4 672.2,303.4 672.2,96 748.2,96 748.2,82.3 581.7,82.3 			" />
                <rect x="787.1" y="82.3" width="14.7" height="221.1" />
                <path
                  d="M938,178.8c-42.6-4.1-62.4-18.6-62.4-45.8c0-24.3,24-41.3,58.5-41.3c31,0,55.3,19.7,63.5,51.3l0.3,1.1l15-4.8l-0.3-1
             c-9.6-36.6-40.4-60.3-78.5-60.3c-42.6,0-73.5,23-73.5,54.6c0,36.4,23.2,55.9,72.9,61.2c48.1,5,71.5,20.9,71.5,48.7
             c0,31.1-26.8,52-66.6,52c-40.4,0-70.4-26.5-78.2-69.2l-0.2-1.2l-15.2,4.1l0.2,1c8.8,48,45.5,79,93.4,79c49.6,0,81.6-25.9,81.6-66
             C1020,204.7,993.9,184.6,938,178.8z"
                />
              </g>
              <path
                d="M288.3,174.4v-27.2c0-0.2,0-0.3,0-0.5c-0.2-6.5-3.6-12.4-9.4-16.8l-82.3-61.4c-11.7-8.7-30-8.7-41.7,0l-82.3,61.4
           c-5.9,4.4-9.2,10.3-9.4,16.8c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5c0,0.7,0.1,1.3,0.2,2c-0.1,0.7-0.2,1.3-0.2,2
           c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5c0,0.7,0.1,1.3,0.2,2c-0.1,0.7-0.2,1.3-0.2,2c0,0.2,0,0.3,0,0.5v27.4c0,0.2,0,0.3,0,0.5
           c0.2,6.5,3.6,12.4,9.4,16.8l82.3,61.4c5.8,4.4,13.3,6.5,20.8,6.5s15-2.2,20.8-6.5l82.3-61.4c6-4.4,9.3-10.5,9.4-17.1l0,0
           c0-0.1,0-0.2,0-0.4v-27.2c0-0.2,0-0.3,0-0.5c0-0.7-0.1-1.3-0.2-1.9c0.1-0.8,0.2-1.5,0.2-2.3c0-0.1,0-0.3,0-0.4v-27.2
           c0-0.2,0-0.3,0-0.5c0-0.7-0.1-1.3-0.2-1.9c0.1-0.8,0.2-1.5,0.2-2.3C288.3,174.6,288.3,174.5,288.3,174.4z M277,193.2l0.6-0.4v0.8
           L277,193.2z M272.4,183.2l-4.4,3.3l-71.5-53.3c-11.7-8.7-30-8.7-41.7,0l-71.5,53.3l-4.4-3.3c-2.4-1.8-4-3.9-4.7-6.2
           c0.7-2.3,2.3-4.4,4.7-6.2l82.3-61.4c7.8-5.8,21-5.8,28.9,0l82.3,61.4c2.4,1.8,4,3.9,4.7,6.2C276.4,179.3,274.8,181.4,272.4,183.2z
            M259,193.2l-69,51.4c-7.8,5.8-21,5.8-28.9,0l-69-51.4l69-51.4c7.8-5.8,21-5.8,28.9,0L259,193.2z M73.8,192.8l0.6,0.4l-0.6,0.4
           V192.8z M78.9,203.2l4.4-3.3l71.5,53.3c5.8,4.4,13.3,6.5,20.8,6.5s15-2.2,20.8-6.5l71.5-53.3l4.4,3.3c2.4,1.8,4,3.9,4.7,6.2
           c-0.7,2.3-2.3,4.4-4.7,6.2l-82.3,61.4c-7.8,5.8-21,5.8-28.9,0l-82.3-61.4c-2.4-1.8-4-3.9-4.7-6.2
           C74.9,207.1,76.5,204.9,78.9,203.2z M73.8,147.3c0-3.2,1.9-6.3,5.1-8.7l82.3-61.4c7.8-5.8,21-5.8,28.9,0l82.3,61.4
           c3.3,2.4,5.1,5.5,5.1,8.7c0,0.1,0,0.2,0,0.3v13.7l-81.1-60.4c-11.7-8.7-30-8.7-41.7,0l-81.1,60.4v-13.7
           C73.8,147.5,73.8,147.4,73.8,147.3z M277.5,239.1c0,3.2-1.9,6.3-5.1,8.7l-82.3,61.4c-7.8,5.8-21,5.8-28.9,0l-82.3-61.4
           c-3.3-2.4-5.1-5.5-5.1-8.7c0-0.1,0-0.2,0-0.3v-13.7l81.1,60.4c5.8,4.4,13.3,6.5,20.8,6.5c7.5,0,15-2.2,20.8-6.5l81.1-60.4v13.7
           C277.5,238.9,277.5,239,277.5,239.1z"
              />
            </g>
            <g>
              <path d="M428.2,364.9V375h-25.8v68h-10.6v-68h-25.7v-10.2H428.2z" />
              <path d="M454.1,364.9V443h-10.6v-78.1H454.1z" />
              <path
                d="M508,364.9c15.2,0,24,9.7,24,22.9c0,13.4-8.7,23-24,23h-22.9V443h-10.6v-78.1H508z M521.4,387.8c0-7.7-4.8-12.7-13.8-12.7
           h-22.4v25.4h22.4C516.6,400.5,521.4,395.6,521.4,387.8z"
              />
            </g>
          </g>
        </svg>
      );
    case 'dropdownArrow':
      return <MdKeyboardArrowDown className={className} />;
    case 'date':
      return <BiCalendarEvent className={className} />;
    case 'search':
      return <BiSearchAlt2 className={className} />;
    case 'filter':
      return <MdTune className={className} />;
    case 'delete':
      return <BiMinusCircle className={className} />;
    case 'calendar':
      return <IoMdCalendar className={className} />;
    case 'arrowDown':
      return <RiArrowDownSLine className={className} />;
    case 'close':
      return <IoCloseOutline className={className} />;
    case 'map':
      return <RiMap2Fill className={className} />;
    case 'back':
      return <MdArrowBack className={className} />;
    case 'backMobile':
      return <MdArrowBack className={className} />;
    case 'phone':
      return <FiPhone className={className} />;
    case 'email':
      return <MdEmail className={className} />;
    case 'user':
      return <FiUser className={className} />;
    case 'users':
      return <FiUsers className={className} />;
    case 'modules':
      return <MdViewModule className={className} />;
    case 'exit':
      return <MdExitToApp className={className} />;
    case 'company':
      return <MdBusiness className={className} />;
    case 'userEmail':
      return <AiOutlineMail className={className} />;
    case 'add':
      return <AiFillPlusCircle className={className} />;
    case 'more':
      return <MdMoreVert className={className} />;
    case 'menu':
      return <TiThMenu className={className} />;
    case 'down':
      return <IoIosArrowDown className={className} />;

    case 'active':
      return <MdDone className={className} />;

    case 'sortedDown':
      return <TiArrowSortedDown className={className} />;
    case 'burger':
      return <GiHamburgerMenu className={className} />;
    case 'forward':
      return <MdArrowForwardIos className={className} />;
    case 'backward':
      return <MdArrowBackIos className={className} />;
    case 'visibleOn':
      return <MdOutlineVisibility className={className} />;
    case 'visibleOff':
      return <MdOutlineVisibilityOff className={className} />;
    case 'returnArrow':
      return <HiOutlineArrowNarrowLeft className={className} />;

    case 'picture':
      return <AiFillPicture className={className} />;
    case 'edit':
      return <MdOutlineEdit className={className} />;
    case 'group':
      return <MdGroups className={className} />;
    case 'photo':
      return <MdOutlineInsertPhoto className={className} />;
    case 'trash':
      return <BiTrash className={className} />;
    case 'person':
      return <MdOutlinePerson className={className} />;
    case 'showMore':
      return <MdUnfoldMore className={className} />;
    case 'deleteItem':
      return <MdOutlineDelete className={className} />;
    case 'eye':
      return <AiOutlineEye className={className} />;
    case 'northEast':
      return <MdOutlineNorthEast className={className} />;
    case 'settings':
      return <MdSettings className={className} />;
    case 'fullscreen':
      return <MdOutlineFullscreen className={className} />;
    case 'exitFullScreen':
      return <MdOutlineFullscreenExit className={className} />;
    default:
      return null;
  }
};

export default Icon;
