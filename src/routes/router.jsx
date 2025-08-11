import { createBrowserRouter } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import LogIn from "../pages/LogIn"
import Register from "../pages/Register"
import PrivateRoute from "./PrivateRoute"
import MyVolunteerList from './../pages/MyVolunteerList';
import UpdatePost from './../pages/UpdatePost';
import Dashboard from './../pages/Dashboard';
import AddPost from "../pages/AddPost"
import MyProfile from './../pages/MyProfile';
import ManagePosts from "../pages/ManagePosts"
import BeAVolunteer from "../pages/BeAVolunteer"
import AllPosts from "../pages/AllPosts"
import PostDetails from "../pages/PostDetails"
import Error from "../pages/shared/Error"
import ContactUs from "../pages/ContactUs"
import AboutUs from "../pages/AboutUs"
import PrivacyPolicy from "../pages/PrivacyPolicy"

const router = createBrowserRouter( [
    {

        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <LogIn />
            },

            {
                path: "/add-post",
                element: <PrivateRoute><AddPost /></PrivateRoute>,
            },

            {
                path: "/my-profile",
                element: <PrivateRoute>
                    <MyProfile />
                </PrivateRoute>,
            },
            {
                path: "/manage-posts",
                element: <PrivateRoute>
                    <ManagePosts />
                </PrivateRoute>,
            },
            {
                path: "/my-volunteer-list",
                element: <PrivateRoute>
                    <MyVolunteerList />
                </PrivateRoute>,
            },
            {
                path: "/update-post/:id",
                element: <PrivateRoute>
                    <UpdatePost />
                </PrivateRoute>,
            },
            {
                path: "/dashboard",
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>,
            },
            {
                path: "/be-a-volunteer/:id",
                element: <PrivateRoute>
                    <BeAVolunteer />
                </PrivateRoute>,
            },
            {
                path: "/post/:id",
                element: <PrivateRoute>
                    <PostDetails />
                </PrivateRoute>,
            },
            {
                path: "/all-posts",
                element: <AllPosts />
            },

            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />
            }
        ]
    }
] )

export default router