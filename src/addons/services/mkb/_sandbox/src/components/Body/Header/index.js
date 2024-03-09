import React, {useRef, useEffect, useState, useContext} from 'react';
import {name} from '../../../config';
import style from './index.module.css';
import switcher from './switcher.module.css';
import Navigation from '../../Navigation/Navigation';
import Logotype from '../../img/Logotype/Logotype';
import SingIn from '../../SingIn/SingIn';
import UserHeader from '../../UserHeader/UserHeader';
import {Accordion} from '../Accordion'
import {isMobile, isTablet, isDesktop} from 'react-device-detect';
import {SideBar} from "../../img/SideBar";
import {useNavigate} from "react-router-dom";
import {UserContext} from '@src/App';

export const Header = ({className = {}, ismobileleftmenu, setmobileleftmenu}) => {
    const checkRef = useRef(false);
    const userContextValue = useContext(UserContext);
    const [changeProfile, setChangeProfile] = useState(false);
    const [isOpen, setOpen] = useState(false)
    const [option, selectOption] = useState(undefined)
    const [active, setActive] = useState(window.location.pathname)
    const navigate = useNavigate();
    const onChangeProfile = () => {
    };


    const onClickHeandler = async event => {
        try {
            if (document.documentElement.classList.contains('black')) {
                document.documentElement.classList.remove('black');
            } else {
                document.documentElement.classList.add('black');
            }

        } catch (err) {
            console.error('ERROR: ', err)
            // setCopySuccess('Не получилось скопировать!');
        }
    };

    useEffect(() => {
        if (option) {
            setOpen(false)
            navigate(`${option.link}`)
        }
    }, [option]);

    useEffect(() => {
        if (userContextValue?.userInfo?.name) setChangeProfile(true);
    }, [userContextValue?.userInfo])
console.log('---------------------------', style)

    return (
        <>
            <div
                className={`${style.header__wrapper}`}
            >
                <div className={`${style['header__container-left']}`}>

                    <div className={style['header__logo-name']}>
                        <Logotype/>
                        <div className={style['header__name-wrapper']}>

                            <p className={style['header__name']}>{name}</p>
                        </div>
                        {(isMobile) && <div className={style['header__container-right']} onClick={onChangeProfile}> {
                            changeProfile
                                ? <UserHeader
                                    className={style}
                                    userName={`${userContextValue?.userInfo?.givenName} ${userContextValue?.userInfo?.familyName}`}
                                    reset={() => {
                                        userContextValue?.resetTokens();
                                        userContextValue?.logOut()
                                    }}
                                />
                                : <SingIn
                                    clickHandle={userContextValue.signIn}
                                    className={style}
                                />}
                        </div>}
                    </div>
                    {!isMobile || isTablet ? (
                        <nav className={style['header__navigation']}>
                            <Navigation
                                option={option}
                                selectOption={selectOption}
                                isOpen={isOpen}
                                setOpen={setOpen}
                                className={className}
                                active={window.location.pathname.split('page')[0]}
                                setActive={setActive}
                                userRole={userContextValue?.userInfo && userContextValue?.userInfo?.roles && userContextValue?.userInfo?.roles[0]}
                            />
                        </nav>
                    ) : (
                        <>
                            <div className={style.headerMenu}>
                                {ismobileleftmenu === 'false' &&
                                    <div
                                        onClick={() => setmobileleftmenu('true')}
                                    >
                                        <SideBar
                                            ismobileleftmenu={ismobileleftmenu}
                                            className={style}
                                        />
                                    </div>}
                                <Accordion
                                    option={option}
                                    selectOption={selectOption}
                                    className={style}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className={style.headerOptions}>
                    {process.env.REACT_APP_Breadcrumbs_v1 !== 'true'
                        ? (
                            <label className={switcher.switch}>
                                <input type="checkbox" ref={checkRef} onChange={onClickHeandler}/>
                                <span className={`${switcher.slider} ${switcher.round}`}></span>
                            </label>
                        )
                        : ('')}
                    {(isTablet || isDesktop) &&
                        <div className={style['header__container-right']} onClick={onChangeProfile}> {
                            changeProfile
                                ? <UserHeader
                                    className={style}
                                    userName={`${userContextValue?.userInfo?.givenName} ${userContextValue?.userInfo?.familyName}`}
                                    reset={() => {
                                        userContextValue?.resetTokens();
                                        userContextValue?.logOut()
                                    }}
                                />
                                : <SingIn
                                    clickHandle={userContextValue.signIn}
                                    className={style}
                                />}
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Header;
