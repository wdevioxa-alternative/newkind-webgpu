import React from 'react';
import style from './index.module.css';

export const GreenSuccess = ({ className = {}}) => {

	return (
		<div className={`${style.icon_wrapper} ${className.icon_wrapper}`}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4.92742 4.92742C1.02419 8.83065 1.02419 15.1663 4.92742 19.0696C8.83065 22.9728 15.1663 22.9728 19.0696 19.0696C22.9728 15.1663 22.9728 8.83065 19.0696 4.92742C15.1663 1.02419 8.83065 1.02419 4.92742 4.92742ZM17.6553 17.6553C14.537 20.7737 9.45998 20.7737 6.34164 17.6553C3.22329 14.537 3.22329 9.45998 6.34164 6.34164C9.45998 3.22329 14.537 3.22329 17.6553 6.34164C20.7737 9.45998 20.7737 14.537 17.6553 17.6553Z" fill="#29CC6A"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M15.7071 10.7071C16.0976 10.3166 16.0976 9.68342 15.7071 9.29289C15.3166 8.90237 14.6834 8.90237 14.2929 9.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.6834 15.0976 11.3166 15.0976 11.7071 14.7071L15.7071 10.7071Z" fill="#29CC6A"/>
			</svg>
		</div>
	);
}