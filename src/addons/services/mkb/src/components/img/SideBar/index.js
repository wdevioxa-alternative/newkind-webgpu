import React from 'react';
import './index.module.css';

export const SideBar = ({className, ismobileleftmenu}) => {
	className = (className) ? className : {}

	return (
		<div className={`icon_wrapper ${ismobileleftmenu ? className.icon_wrapper : className.icon_wrapper_close}`}>
			<svg
				width="14"
				height="12"
				viewBox="0 0 14 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M0.25 11.25C0.25 11.6642 0.585786 12 1 12C1.41421 12 1.75 11.6642 1.75 11.25L1.75 0.75C1.75 0.335786 1.41421 -5.08894e-08 0.999999 -3.27835e-08C0.585786 -1.46777e-08 0.249999 0.335786 0.25 0.75L0.25 11.25Z"
					  fill="#6C8BC9"/>
				<path d="M3.31 6.28486C3.3457 6.37692 3.39922 6.46103 3.4675 6.53236L6.4675 9.53236C6.53743 9.60229 6.62045 9.65776 6.71181 9.69561C6.80318 9.73345 6.90111 9.75293 7 9.75293C7.09889 9.75293 7.19682 9.73345 7.28819 9.69561C7.37955 9.65776 7.46257 9.60229 7.5325 9.53236C7.60243 9.46243 7.6579 9.37941 7.69574 9.28805C7.73359 9.19668 7.75307 9.09876 7.75307 8.99986C7.75307 8.90097 7.73359 8.80304 7.69574 8.71167C7.6579 8.62031 7.60243 8.53729 7.5325 8.46736L5.8075 6.74986L13 6.74986C13.1989 6.74986 13.3897 6.67084 13.5303 6.53019C13.671 6.38954 13.75 6.19877 13.75 5.99986C13.75 5.80095 13.671 5.61018 13.5303 5.46953C13.3897 5.32888 13.1989 5.24986 13 5.24986L5.8075 5.24986L7.5325 3.53236C7.67373 3.39113 7.75307 3.19959 7.75307 2.99986C7.75307 2.80013 7.67373 2.60859 7.5325 2.46736C7.39127 2.32613 7.19973 2.24679 7 2.24679C6.80027 2.24679 6.60873 2.32613 6.4675 2.46736L3.4675 5.46736C3.39922 5.53869 3.3457 5.6228 3.31 5.71486C3.27032 5.80464 3.24983 5.90171 3.24983 5.99986C3.24983 6.09801 3.27032 6.19509 3.31 6.28486Z"
					  fill="#6C8BC9"/>
			</svg>
		</div>
	);
}