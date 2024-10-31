import React from 'react';
import Header from "@/components/layout/header/index.jsx";
import Footer from "@/components/layout/footer/index.jsx";

const Index = ({ children }) => {
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

export default Index;