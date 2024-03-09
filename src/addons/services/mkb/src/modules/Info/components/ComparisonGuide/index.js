import React, {useEffect} from 'react';
import style from './index.module.css';
import { Layout } from '../Layout'
import axios from "@src/utilites/API";
import {search} from "../../../../utilites/search";
import {href} from "../../../../utilites/Icd-11";

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| колонка 1 | колонка 2 |
| ыыыыы | вввввв |
`

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const downloadViaBrowser = url => {
    let windowObjectReference = window.open(url,"_blank");
    window.focus();
    windowObjectReference.blur();

    delay(500)
        .then(() => {
            windowObjectReference.close()
        }).catch(e => console.error(e));
}

export const ComparisonGuide = () => {
    return (
        <Layout
            className={style.toc}
        >
            <div>
                <h2>Сопоставление кодов МКБ-10 и МКБ-11</h2>
                <p className={style.paragraph}>Общая информация о справочнике МКБ-11, его назначении, структуре, отличиях от МКБ-10</p>
                <p
                  onClick={() => downloadViaBrowser(`/v1/release/2023-01/lang/ru/mapping`)}
                  className={style.decoration}
                >
                    Общая информация
                </p>
            </div>
        </Layout>
    )
}

export default ComparisonGuide;