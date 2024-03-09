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
                    <ProtectedRoute
                        redirectComponent={<Forbidden />}
                        isAllowed={
                            userInfo &&
                            userInfo?.roles &&
                            userInfo?.roles?.includes('mkb_admin')
                        }
                    >
                        <Update />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Components;
