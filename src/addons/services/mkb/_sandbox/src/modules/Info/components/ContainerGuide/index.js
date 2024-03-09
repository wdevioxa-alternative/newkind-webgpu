import React from 'react';
import style from './index.module.css';
import { Markdown } from '../../../../components/Markdown'
import { CONTENT } from './md'
import { Layout } from '../Layout'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| колонка 1 | колонка 2 |
| ыыыыы | вввввв |
`
export const ContainerGuide = () => {
    return (
        <Layout
            className={style.toc}
            mdContent={CONTENT}
        >
            <div>
                <h2>Общая информация</h2>
                <p>
                    Общая информация о справочнике МКБ-11, его назначении, структуре, отличиях от МКБ-10

                    <p><a href="/Общая информация.pdf">Общая информация</a></p>
                </p>
            </div>
            {/*<Markdown*/}
            {/*    className={style.tocContent}*/}
            {/*    mdContent={CONTENT}*/}
            {/*/>*/}
        </Layout>)
}


export default ContainerGuide;
