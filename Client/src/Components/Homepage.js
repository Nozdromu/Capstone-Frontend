import { createRef } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
    useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Container} from 'react-bootstrap'
import Home from './Itemgrid'
import About from './Accountpage'
import Navbar from './Navbar'
import Map from './Map'
import Chat from './Chat'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const routes = [
    { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
    { path: '/account', name: 'Account', element: <About />, nodeRef: createRef() },
    { path: '/map', name: 'Map', element: <Map />, nodeRef: createRef() },
    { path: '/chat', name: 'Chat', element: <Chat />, nodeRef: createRef() }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <Example />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        })),
    },
])

function Example() {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}
    return (
        <>
            <Navbar routes={routes}></Navbar>
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
    )
}
function HP() {
    return (<RouterProvider router={router} />)
}

export default HP;
