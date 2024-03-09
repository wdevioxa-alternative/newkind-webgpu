import React, {useState} from 'react';
import style from './index.module.css';
import isEmpty from "../../../../../utilites/isEmpty";
import { useSelector } from "react-redux";

export const Coder = () => {
    const coordination = useSelector(state => state.icd.coordination.coordination)
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipBoard = async event => {
        try {
            await navigator.clipboard.writeText(event.currentTarget.textContent);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    const get = {
        coordination: [],
        property: (result, code) => {
            if(!isEmpty(code.property)) {
                for(let property of code.property) {
                    result.self = `${result.self}&${property.substrate ? property.substrate : '/'}`
                }
            }

            return result.self
        },
        all: (code) => {
            let result = {}
            result.self = ''
            for(let i  = 0; i < code.length; ++i) {
                if(!i) {
                    result.self = code[i].substrate
                    result.self = get.property(result, code[i])
                } else {
                    result.self = `${result.self}/${code[i].substrate ? code[i].substrate : '' }`
                    result.self = get.property(result, code[i])
                }
            }

            return result
        }
    }

    const codes = get.all(coordination)

    return(
        <div
            className={style.postCoordinationCodeList}
        >
            <p>Код:</p>
          <div
            className={style.code}
            onClick={copyToClipBoard}
          >
              {codes.self}
          </div>
        </div>
    )
}

export default Coder;
