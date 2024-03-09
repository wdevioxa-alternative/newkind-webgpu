import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContainerGuide } from './ContainerGuide';
import { GuideMKB } from './GuideMKB'
import { UserManual } from './UserManual'
export const Components = () => {

    return (
        <Routes>
            <Route path={`/general`} element={<ContainerGuide />} />
            <Route path={`/container`} element={<GuideMKB />} />
            <Route path={`/user`} element={<UserManual />} />
            <Route path={`/*`} element={<ContainerGuide />} />
        </Routes>
    )
}

export default Components;