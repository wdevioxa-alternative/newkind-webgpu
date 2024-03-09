import style from './index.module.css';
import React, { useState, useEffect } from 'react';
import colspan from '../../../../../../../components/img/colspanTree';

import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import OpenCloseTree from "../../../../../../../components/img/OpenCloseTree";

export const IconColspan = ({ onColspanHandler }) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();

    return (
        <div
            ref={setTriggerRef}
            onClick={onColspanHandler}
            className={style.button}
        >
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    Свернуть все узлы
                    <div {...getArrowProps({ className: 'tooltip-arrow ' })} />
                </div>
            )}
            <OpenCloseTree/>
        </div>
    )
}
