import React, { useEffect, useState } from 'react';

import style from './index.module.css';

import PlusMarker from '../../img/PlusMarker'

function TermsMatching({ onClickTerm, term, postcoordinationScale, disease }) {
	const [stringTerm, useStringTerm] = useState(term.label['@value']);

	return (
		<div className={style.termsMatching}>
			<p
				className={style.textList}
				dangerouslySetInnerHTML={{__html: stringTerm}}
			></p>
			{postcoordinationScale &&
				<PlusMarker
					className={style}
					onClick={() => {
						onClickTerm(disease.uri)
					}}
				/>}
		</div>
	);
}

export default TermsMatching;
