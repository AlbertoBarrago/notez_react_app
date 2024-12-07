import Header from "@/components/layout/header/header.jsx";
import Footer from "@/components/layout/footer/footer.jsx";
import AuthService from "@/services/auth/auth.js";
const auth = new AuthService();

const Layout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen roboto-thin">
            {!auth.isLoggedIn() ? "" :
                <div className="w-full max-w-screen-xl mx-auto">
                    <Header/>
                </div>
            }
            <main className="flex-grow w-screen mx-auto">
                {children}
            </main>
            <div className="w-full max-w-screen-xl mx-auto">
                <Footer/>
            </div>
        </div>
    );
}

export default Layout;