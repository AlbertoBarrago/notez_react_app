import React from 'react';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-4">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;