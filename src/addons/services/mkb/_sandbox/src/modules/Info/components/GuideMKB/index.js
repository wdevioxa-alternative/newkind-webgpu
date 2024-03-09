import React from 'react';
import style from './index.module.css';
import { Markdown } from '../../../../components/Markdown'
import { CONTENT } from './md'
import { Layout } from '../Layout'
export const GuideMKB = () => {
    return (
        <Layout
            className={style.toc}
            mdContent={CONTENT}
        >
            <div>
                <h2>Для разработчиков МИС</h2>
                <p>
                    Инструкции по применению МКБ-11 разработчиками медицинских информационных систем
                    <p><a href="/Руководство_для_МИС.pdf">Для разработчиков МИС</a></p>
                </p>
            </div>
        </Layout>)
}
export default GuideMKB;
