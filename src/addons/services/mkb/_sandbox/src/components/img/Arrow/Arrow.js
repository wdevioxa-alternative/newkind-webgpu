import React from 'react';
import './Arrow.style.css';
import isEmpty from "../../../utilites/isEmpty";

function Arrow({className}) {
	className = isEmpty(className) ? {} : className

	return (
		<>
			<div className={`arrow-img__wrapper ${className['arrow-img__wrapper']}`}>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.41421 10C8.52331 10 8.07714 11.0771 8.70711 11.7071L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L15.2929 11.7071C15.9229 11.0771 15.4767 10 14.5858 10H9.41421Z"
						fill="white"
						fillOpacity="0.6"
					/>
				</svg>
			</div>
		</>
	);
}

export default Arrow;
