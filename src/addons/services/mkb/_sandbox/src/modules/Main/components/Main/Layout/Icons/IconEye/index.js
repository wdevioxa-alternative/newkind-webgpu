import style from './index.module.css';
import React, { useState, useEffect } from 'react';
import Eye from '../../../../../../../components/img/Eye';

import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

export const IconEye = ({ onGrayDataHandler, isEnable }) => {
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
            onClick={onGrayDataHandler}
            className={style.button}
        >
            {visible && isEnable && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    {/* Скрыть серые записи */}
                    Переключать отображение дочерних записей Базового компонента, расположенных в других разделах классификации (серые дочерние записи)
                    <div {...getArrowProps({ className: 'tooltip-arrow ' })} />
                </div>
            )}

            {visible && !isEnable && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    Открыть все серые записи.
                    <div {...getArrowProps({ className: 'tooltip-arrow ' })} />
                </div>
            )}
            <Eye
                isEnable={isEnable}
            />
        </div>
    )
}
