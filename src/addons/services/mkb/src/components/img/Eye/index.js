import React from 'react';
import './index.style.css';

function Index({isEnable}) {
	return (
		<>
			<div className="arrow-img__wrapper">
				{isEnable ? (
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13 7C13 7.01831 12.9995 7.03651 12.9985 7.05457C14.7352 7.24609 16.3228 7.93164 17.618 8.96765L19.2929 7.29274C19.6834 6.90222 20.3166 6.90222 20.7071 7.29274C21.0976 7.68327 21.0976 8.31643 20.7071 8.70696L19.0322 10.3819C20.0432 11.6458 20.7207 13.1884 20.9311 14.8762C20.9995 15.4242 20.6106 15.9239 20.0626 15.9922C19.5145 16.0605 19.0148 15.6717 18.9465 15.1236C18.516 11.6716 15.5696 8.9999 12.0007 8.9999C8.4318 8.9999 5.48538 11.6716 5.05492 15.1236C4.98658 15.6717 4.48691 16.0605 3.93887 15.9922C3.39082 15.9239 3.00195 15.4242 3.07029 14.8762C3.28071 13.1888 3.95789 11.6465 4.96859 10.3827L3.29289 8.70696C2.90237 8.31643 2.90237 7.68327 3.29289 7.29274C3.68342 6.90222 4.31658 6.90222 4.70711 7.29274L6.38264 8.96828C7.67759 7.9322 9.26501 7.2465 11.0015 7.05473C11.0005 7.03661 11 7.01836 11 7V5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V7Z"
							  fill="#6C8BC9"/>
						<path fillRule="evenodd" clipRule="evenodd"
							  d="M16 16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16C8 13.7909 9.79086 12 12 12C14.2091 12 16 13.7909 16 16ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16Z"
							  fill="#6C8BC9"/>
					</svg>
				) : (
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.05492 6.87637C4.98658 6.32832 4.48691 5.93945 3.93887 6.00779C3.39082 6.07613 3.00195 6.5758 3.07029 7.12384C3.28071 8.81125 3.95789 10.3535 4.96859 11.6173L3.29289 13.293C2.90237 13.6836 2.90237 14.3167 3.29289 14.7073C3.68342 15.0978 4.31658 15.0978 4.70711 14.7073L6.38265 13.0317C7.67759 14.0678 9.26502 14.7535 11.0015 14.9453C11.0005 14.9634 11 14.9816 11 15V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V15C13 14.9817 12.9995 14.9635 12.9985 14.9454C14.7352 14.7539 16.3228 14.0684 17.618 13.0324L19.2929 14.7073C19.6834 15.0978 20.3166 15.0978 20.7071 14.7073C21.0976 14.3167 21.0976 13.6836 20.7071 13.293L19.0322 11.6181C20.0432 10.3542 20.7207 8.8116 20.9311 7.12384C20.9995 6.5758 20.6106 6.07613 20.0626 6.00779C19.5145 5.93945 19.0148 6.32832 18.9465 6.87637C18.516 10.3284 15.5696 13.0001 12.0007 13.0001C8.4318 13.0001 5.48538 10.3284 5.05492 6.87637Z"
							  fill="#6C8BC9"/>
					</svg>
				)}
			</div>
		</>
	);
}

export default Index;
