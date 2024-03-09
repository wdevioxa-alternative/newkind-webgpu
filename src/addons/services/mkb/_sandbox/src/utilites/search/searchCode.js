/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */

import axios from '@src/utilites/API';

import useLinks from './links';

// combination: "NA07.20 & XC16 & XC4L / PB80 & XE47R / PA00 & XE43G"
export async function searchCode(value) {
	try {
		const links = useLinks();
    if (value.length >= 3) {
      const { data: response } = await axios.post(`${links.URL_CODE_FOUND}`, {
        combination: value,
      });

      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}
