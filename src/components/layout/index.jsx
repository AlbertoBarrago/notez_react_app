import Header from "@/components/layout/header/index.jsx";
import Footer from "@/components/layout/footer/index.jsx";
import AuthService from "@/services/login/index.js";
const auth = new AuthService();

const Index = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen tiny5-regular">
            {!auth.isLoggedIn() ? "" :
                <div className="w-full max-w-screen-xl mx-auto">
                    <Header/>
                </div>
            }
            <main className="flex-grow max-w-screen-xl mx-auto">
                {children}
            </main>
            {!auth.isLoggedIn() ? "" :
                <div className="w-full max-w-screen-xl mx-auto">
                    <Footer/>
                </div>
            }
        </div>
    );
}

export default Index;