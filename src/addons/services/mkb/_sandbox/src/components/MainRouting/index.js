import React, {Suspense, lazy, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../../modules';
import { idKey } from '@src/utilites/idKey'
import {useDispatch} from "react-redux";
import {globalActions} from "../../modules/Main/reducers/global";
import {isMobile} from "react-device-detect";
import Main from '../../modules/Main/index'
import Info from '../../modules/Info/index'
import Admin from '../../modules/Admin/index'

const description = {
    Admin: (ismobileleftmenu, setmobileleftmenu) => <Admin
        ismobileleftmenu={ismobileleftmenu}
        setmobileleftmenu={setmobileleftmenu}
    ></Admin>,
    Info: (ismobileleftmenu, setmobileleftmenu) => <Info
        ismobileleftmenu={ismobileleftmenu}
        setmobileleftmenu={setmobileleftmenu}
    ></Info>,
    Main: (ismobileleftmenu, setmobileleftmenu) => <Main
        ismobileleftmenu={ismobileleftmenu}
        setmobileleftmenu={setmobileleftmenu}
    ></Main>
}

const Elements = routes.map((route) => {
    const { module, path, Body } = route;


    // todo понадобится
    // const LazyComponent = lazy(() => import(`../../modules/${module}/index.js`));

    if(module) {
        const RenderFn = () => {
            const [ismobileleftmenu, setmobileleftmenu] = useState("true")
            return (
                <Body
                className={'test'}
                    ismobileleftmenu={ismobileleftmenu}
                    setmobileleftmenu={setmobileleftmenu}
                >
                    <Suspense fallback={<p>Loading...</p>}>
                        {description[module](ismobileleftmenu, setmobileleftmenu)}
                        {/* <LazyComponent
                            ismobileleftmenu={ismobileleftmenu}
                            setmobileleftmenu={setmobileleftmenu}
                        /> */}
                    </Suspense>
                </Body>
            );
        };
        return <Route key={idKey()} path={path} element={<RenderFn />} />
    }
})


export const MainRouting = () => {
    const dispatch = useDispatch()

    dispatch(
        globalActions.initial({
            version: 'v1.0.15',
            device: isMobile
        })
    )

    return (
        <BrowserRouter>
            <Routes>
                { Elements }
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouting;
