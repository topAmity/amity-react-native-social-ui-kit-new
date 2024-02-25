import React from 'react';
import { Svg, Path } from 'react-native-svg';

const OfficialIcon = ({ width = 19, height = 20, color='' }) => (
  <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
    <Path
      d="M9.47175 15.4777C10.1655 16.1767 10.828 16.1715 11.5269 15.4777L12.3094 14.6953C12.3824 14.6223 12.445 14.6014 12.5389 14.6014H13.6447C14.6306 14.6014 15.1001 14.1319 15.1001 13.1461V12.0402C15.1001 11.9463 15.1262 11.8785 15.194 11.8107L15.9764 11.023C16.6754 10.3293 16.6702 9.66681 15.9764 8.97305L15.194 8.19061C15.1262 8.11758 15.1001 8.05499 15.1001 7.9611V6.85525C15.1001 5.86938 14.6306 5.39991 13.6447 5.39991H12.5389C12.445 5.39991 12.3772 5.37383 12.3094 5.30602L11.5269 4.52358C10.828 3.82461 10.1655 3.82461 9.47175 4.5288L8.68931 5.30602C8.6215 5.37383 8.55368 5.39991 8.45979 5.39991H7.35395C6.36807 5.39991 5.89861 5.85894 5.89861 6.85525V7.9611C5.89861 8.05499 5.87253 8.1228 5.80472 8.19061L5.02228 8.97305C4.3233 9.66681 4.32852 10.3293 5.02228 11.023L5.80472 11.8107C5.87253 11.8785 5.89861 11.9463 5.89861 12.0402V13.1461C5.89861 14.1319 6.36807 14.6014 7.35395 14.6014H8.45979C8.55368 14.6014 8.61628 14.6223 8.68931 14.6953L9.47175 15.4777ZM9.63345 12.6714C9.45088 12.6714 9.30482 12.6036 9.19007 12.4836L7.52087 10.6162C7.43219 10.5223 7.38524 10.3919 7.38524 10.2615C7.38524 9.94849 7.60954 9.72419 7.93295 9.72419C8.1103 9.72419 8.24071 9.78157 8.35547 9.90676L9.61258 11.3099L12.1268 7.72115C12.252 7.5438 12.3876 7.47077 12.5963 7.47077C12.9197 7.47077 13.1492 7.69507 13.1492 7.99761C13.1492 8.10193 13.1075 8.23234 13.0292 8.34188L10.1029 12.4471C9.98294 12.6036 9.82645 12.6714 9.63345 12.6714Z"
      fill={color}
    />
  </Svg>
);

export default OfficialIcon;
