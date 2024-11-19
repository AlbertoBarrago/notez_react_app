import Header from "@/components/layout/header/header.jsx";
import Footer from "@/components/layout/footer/footer.jsx";
import AuthService from "@/services/login/login.js";
const auth = new AuthService();

const Layout = ({children}) => {
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

export default Layout;