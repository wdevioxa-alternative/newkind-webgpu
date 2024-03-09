import React from 'react';
import './Close.style.css';

function Close({ onClick, className = ''}) {
	return (
		<div
            className={`close-img__wrapper ${className}`}
            onClick={onClick}
        >
            <svg
                // width="12"
                // height="12"
				viewBox="0 0 12 12"
				preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M7.40864 5.99915L11.7045 1.71268C11.8926 1.52453 11.9983 1.26935 11.9983 1.00326C11.9983 0.737183 11.8926 0.481998 11.7045 0.29385C11.5164 0.105701 11.2612 0 10.9952 0C10.7291 0 10.474 0.105701 10.2859 0.29385L6 4.59031L1.71414 0.29385C1.52602 0.105701 1.27087 -1.98247e-09 1.00483 0C0.738783 1.98247e-09 0.483635 0.105701 0.295513 0.29385C0.107391 0.481998 0.00170495 0.737183 0.00170495 1.00326C0.00170495 1.26935 0.107391 1.52453 0.295513 1.71268L4.59136 5.99915L0.295513 10.2856C0.201875 10.3785 0.127553 10.489 0.0768329 10.6108C0.0261132 10.7325 0 10.8631 0 10.995C0 11.1269 0.0261132 11.2575 0.0768329 11.3793C0.127553 11.501 0.201875 11.6116 0.295513 11.7044C0.388386 11.7981 0.49888 11.8724 0.620622 11.9232C0.742363 11.9739 0.872943 12 1.00483 12C1.13671 12 1.26729 11.9739 1.38903 11.9232C1.51077 11.8724 1.62127 11.7981 1.71414 11.7044L6 7.40799L10.2859 11.7044C10.3787 11.7981 10.4892 11.8724 10.611 11.9232C10.7327 11.9739 10.8633 12 10.9952 12C11.1271 12 11.2576 11.9739 11.3794 11.9232C11.5011 11.8724 11.6116 11.7981 11.7045 11.7044C11.7981 11.6116 11.8724 11.501 11.9232 11.3793C11.9739 11.2575 12 11.1269 12 10.995C12 10.8631 11.9739 10.7325 11.9232 10.6108C11.8724 10.489 11.7981 10.3785 11.7045 10.2856L7.40864 5.99915Z" fill="#C3C6CE"/>
            </svg>
		</div>
	);
}

export default Close;
