import React from 'react';
import './Button.style.css';
import {profile} from '../../config';
// import { fillOptions } from '../../modules/fillOptionsDownload';

import Download from '../img/Download/Download';
import Basket from '../img/Basket/Basket';

function Button({buttonHandler}) {
	const onclickHandler = () => {
		buttonHandler();
	};

	return (
		<div className='buttons'>
			<button onClick={onclickHandler} className="button__main">
				{profile.button}
			</button>

			<button onClick={onclickHandler} className="button__second">
				{profile.button}
			</button>

			<button onClick={onclickHandler} className="button__main-download">
				<Download />
				{profile.button}
			</button>

			<button onClick={onclickHandler} className="button__second-download">
				<Download />
				{profile.button}
			</button>
			<button onClick={onclickHandler} className="button__main-delete-img">
				<Basket />
				{profile.button}
			</button>

			<button onClick={onclickHandler} className="button__main-delete">
				{profile.button}
			</button>

			<button onClick={onclickHandler} className="button__second-delete">
				{profile.button}
			</button>


			<button onClick={onclickHandler} className="button__second-delete-img">
				<Basket />
				{profile.button}
			</button>
		</div>
	);
}

export default Button;

export const MainButton = ({buttonHandler, buttonLabel, bgColor, isDisabled}) => {
  const onclickHandler = () => {
    console.log('Я - onclick handler');
    buttonHandler();
  };

  return (
    <button style={{'background': bgColor}} disabled={isDisabled} onClick={onclickHandler} className="button__main">
      {buttonLabel || profile.button}
    </button>
  );
};

export const SecondButton = ({buttonHandler, buttonLabel, buttonCheckImg = true}) => {
	const onclickHandler = () => {
	  buttonHandler();
	};

	return (
	  <button onClick={onclickHandler} className="button__second">
		{buttonCheckImg && (<div className="button__second-img">{' '}</div>)}
		{buttonLabel || profile.button}
	  </button>
	);
  };

  export const DeleteButton = ({buttonHandler, buttonLabel}) => {
	const onclickHandler = () => {
	  console.log('Я - onclick handler');
	  buttonHandler();
	};

	return (
		<button onClick={onclickHandler} className="button__main-delete">
		{buttonLabel || profile.button}
	</button>
	);
  };
