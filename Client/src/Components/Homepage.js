import HomeNavbar from './Navbar';
import Itemgrid from './Itemgrid';
import React from "react";
import Accountpage from './Accountpage';
import { createRef } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
    useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Container, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './transition.css'

const routes = [
    { path: '/', name: 'Home', element: <Itemgrid />, nodeRef: createRef() },
    { path: '/account', name: 'About', element: <Accountpage />, nodeRef: createRef() },
]
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        })),
    },
])

function Home() {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}

    // const { location } = {...props};
    // const currentKey = location.pathname.split("/")[1] || "/";
    return (
        <>
            <HomeNavbar></HomeNavbar>
            <Container className="container">
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                        {(state) => (
                            <div ref={nodeRef} className="page">
                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Container>
        </>

        // <TransitionGroup>
        //     <CSSTransition
        //         // key={currentKey}
        //         timeout={timeout}
        //         classNames="pageSlider"
        //         mountOnEnter={false}
        //         unmountOnExit={true}>


        //         <Routes>
        //             <Route exact path="/" element={<Itemgrid />} />
        //             <Route path="/account" element={<Accountpage />} />
        //         </Routes>

        //     </CSSTransition>
        // </TransitionGroup>
        // 


    );
}

function Homepage(){
    return(<RouterProvider router={router}></RouterProvider>)
}

export default Homepage;