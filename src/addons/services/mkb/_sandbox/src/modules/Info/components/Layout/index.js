import React, { useState } from 'react';
import style from './index.module.css';
import { TableOfContent } from '../../../../components/TableOfContent'
import {isMobile} from "react-device-detect";

export const Layout = (props) => {
    const {children, mdContent, className} = props

    return (
        <div className={style.container}>
            {!isMobile &&
                <aside className={style.aside}>
                    <TableOfContent
                        className={className}
                        mdContent={mdContent}
                    />
                </aside>}
            <div className={style.content}>
                {children}
            </div>
        </div>)
}
