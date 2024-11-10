import React from 'react';
import Header from "@/components/layout/header/index.jsx";
import Footer from "@/components/layout/footer/index.jsx";
import {useLocation} from "react-router-dom";

const Index = ({ children }) => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className="flex flex-col min-h-screen tiny5-regular">
            {location.pathname === "/" ? "": <Header  />}
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Index;