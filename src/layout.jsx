import React from 'react';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;