import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useLocation,
    Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { StrictMode, useState } from "react";
import Navbar from './Navbar'
import Core from './Core'
import Navlink from './Navlink';


const pages = Core.getpages();

/////////////////////////////////////////////////////////////////////
var _routes;

if (!_routes) {
    _routes = {};
    Object.keys(pages).forEach(key => {
        _routes[key] = { path: pages[key].path, name: pages[key].name, element: pages[key].page, navlink: <Navlink routes={{ path: pages[key].path, name: pages[key].name }}></Navlink> }
    })
    console.log(_routes)
}

const PageLayout = ({ children }) => children;

const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 1
    }
};

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
};

const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>
        </PageLayout>
    );
};

export default function Newhome() {
    const [isload, setload] = useState(false);
    const [login, setlogin] = useState(false);

    var printpage = () => {
        setload(true);
        setlogin(Core.getUser()._islogin())
    }
    if (!isload)
        Core.addhook(printpage)

    return (isload ?
        <StrictMode>
            <Router>
                <Navbar router_login={setlogin} routes={_routes}></Navbar>
                <Routes>
                    <Route element={<AnimationLayout />}>
                        {
                            Object.values(_routes).map(val => {
                                return <Route key={val.name} path={val.path} element={(val.name==='Chat'||val.name==='Account')?(login?val.element():<Navigate replace to={'/'}/>):val.element()}></Route>
                            })
                        }
                    </Route>
                </Routes>
            </Router>
        </StrictMode> : <></>
    );
}
