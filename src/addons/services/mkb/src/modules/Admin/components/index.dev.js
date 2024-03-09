import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Update } from './Update';
import { Forbidden } from './Forbidden';
import { UserContext } from '@src/App';
import { ProtectedRoute } from '@src/components/ProtectedRoute';

export const Components = props => {
    const { userInfo } = React.useContext(UserContext);
    return (
        <Routes>
            <Route
                path={'/update'}
                element={
                    <Update />
                }
            />
        </Routes>
    );
};

export default Components;

