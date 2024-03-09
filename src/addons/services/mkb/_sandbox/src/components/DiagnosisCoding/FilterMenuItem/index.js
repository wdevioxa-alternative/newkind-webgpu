import React from 'react';
import './FilterMenuItem.style.css';

function FilterMenuItem({ title, selectOption, object, className }) {

	const onClickHandler = (object) => {
		selectOption(object);
	};

	return (
		<div
			className={`filter-menu-item__wrapper ${className['filter-menu-item__wrapper']}`}
			onClick={() => {onClickHandler(object)}}
		>
			<p
				className={`profile-menu-item__title ${className['profile-menu-item__title']}`}
			>
				{ title }
			</p>
		</div>
	);
}

export default FilterMenuItem;
