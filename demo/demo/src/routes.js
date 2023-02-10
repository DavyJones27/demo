import { useRoutes, Navigate, Outlet } from "react-router-dom"
import { Survey, UserForm } from "./page"

export const Router = () => {

    return useRoutes([
        {
            path: '/',
            element: <div>
                <Outlet />
            </div>,
            children: [
                { path: '/', element: <Navigate to="/form" /> },
                { path: 'form', element: <UserForm /> },
                { path: 'survey', element: <Survey /> }
            ]
        },
    ])
}