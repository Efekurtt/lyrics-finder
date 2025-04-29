import React, { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  visible: boolean;
}

const Alert: React.FC<AlertProps> = ({ type, message, visible }) => { 
  if (!visible) return null;

  return (
    <div className="alert-bar">
      {type === 'success' && (
        <div className="sucessfuly">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
            <g clipPath="url(#clip0_27_17)">
              <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM34.2978 11.2412L39.2841 16.2275L23.71 31.8047L18.7529 36.7588L13.7666 31.7725L8.7158 26.7187L13.6699 21.7646L18.7207 26.8183L34.2978 11.2412Z" fill="#2ACB4E"/>
            </g>
            <defs>
              <clipPath id="clip0_27_17">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p>{message}</p>
        </div>
      )}
      {type === 'error' && (
        <div className="error">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M12.8 30L20 22.8L27.2 30L30 27.2L22.8 20L30 12.8L27.2 10L20 17.2L12.8 10L10 12.8L17.2 20L10 27.2L12.8 30ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3733 7.65 35.9487 5.85 34.15C4.05 32.3513 2.62534 30.2347 1.576 27.8C0.526669 25.3653 0.00133586 22.7653 2.53164e-06 20C-0.0013308 17.2347 0.524003 14.6347 1.576 12.2C2.628 9.76533 4.05267 7.64867 5.85 5.85C7.64734 4.05133 9.764 2.62667 12.2 1.576C14.636 0.525334 17.236 0 20 0C22.764 0 25.364 0.525334 27.8 1.576C30.236 2.62667 32.3527 4.05133 34.15 5.85C35.9473 7.64867 37.3727 9.76533 38.426 12.2C39.4793 14.6347 40.004 17.2347 40 20C39.996 22.7653 39.4707 25.3653 38.424 27.8C37.3773 30.2347 35.9527 32.3513 34.15 34.15C32.3473 35.9487 30.2307 37.374 27.8 38.426C25.3693 39.478 22.7693 40.0027 20 40Z" fill="#E94F4F"/>
          </svg>
          <p>{message}</p>
        </div>
      )}
      {type === 'warning' && (
        <div className="warning">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM22 30H18V26H22V30ZM22 22H18V10H22V22Z" fill="#FBCA01"/>
          </svg>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert; 