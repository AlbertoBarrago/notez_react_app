import React from 'react';
import Header from "@/components/layout/header/index.jsx";
import Footer from "@/components/layout/footer/index.jsx";

const Index = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen tiny5-regular">
            <Header />
            <main className="flex-grow p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Index;