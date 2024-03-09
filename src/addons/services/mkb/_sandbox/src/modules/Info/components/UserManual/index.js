import React from 'react';
import style from './index.module.css';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CONTENT } from './md'
import { Layout } from '../Layout'

export const UserManual = () => {
    return (
        <Layout
            className={style.toc}
            mdContent={''}
        >
            {/*<ReactMarkdown*/}
            {/*    children={CONTENT}*/}
            {/*    remarkPlugins={[remarkGfm]}*/}
            {/*/>*/}
            <div>
                <h2>Для медицинских работников</h2>
                <p>
                    Инструкции по применению МКБ-11 медицинскими работниками.
                </p>
                <p>
                    Средства ознакомления и пользовательского взаимодействия со справочником, предоставляемые локализованным Контейнером МКБ-11:
                </p>
                <ul className={style.ul}>
                    <li>«Браузер МКБ-11»;</li>
                    <li>«Инструмент кодирования»;</li>
                    <li>«Декодирование».</li>
                </ul>
                <p><a href="/Руководство пользователя.pdf">Для медицинских работников</a></p>
            </div>
        </Layout>)
}

export default UserManual;
