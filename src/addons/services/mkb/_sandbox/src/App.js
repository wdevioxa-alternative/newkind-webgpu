import React, { StrictMode, createContext } from 'react';
import MainRouting from './components/MainRouting';
import { Provider } from 'react-redux';
import store from './store';
import { useAuth } from './hooks/useAuth';
import './index.css';

export const UserContext = createContext();

export const App = ({ root }) => {
    if(!root) {
        root = {}   
    }

    const auth = useAuth();
    root.env = process.env
    
    if(process.env.REACT_APP_MAIN_THEME !== 'true') {
        document.documentElement.classList.add('orange');
    }

    auth.render = root.render

    return (
        <StrictMode>
            <Provider store={store}>
                <UserContext.Provider value={Object.assign(auth, root.render ? root.render: {})}>
                        <MainRouting />
                </UserContext.Provider>
            </Provider>
        </StrictMode>
    )
}

export default App
