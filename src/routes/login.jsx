/**
 * @fileoverview Authentication route component handling auth and registration
 * @module AuthRoute
 */
import {useState} from "react";
import AuthService from "@/services/auth/auth.js";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginForm} from "@/components/loginForm.jsx";
import ErrorsModal from "@/components/dialogs/errors.jsx";
import {toast} from "sonner";

const SIGN_IN = "signin";

/**
 * Main authentication part handling both sign-in and sign-up functionality
 * @function AuthRoute
 * @returns {JSX.Element} Rendered authentication component
 */
export default function AuthRoute() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorDialogIsOpen, setErrorDialogIsOpen] = useState(false);
    const auth = new AuthService();
    // eslint-disable-next-line no-unused-vars
    const [tab, setTab] = useState(SIGN_IN);
    const [errorProps, setErrorProps] = useState({});
    const navigate = useNavigate();
    const signingForm = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });
    const signupForm = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    /**
     * Handles sign-in form submission
     * @async
     * @param {Object} data - Form data containing username and password and email
     * @param {string} data.email - User's email
     * @param {string} data.username - User's username
     * @param {string} data.password - User's password
     */
    const onSubmitSignIn = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.login(data.username, data.password);
            if (resp.user) {
                toast.success("Login successful");
                navigate("/notes");
            }
        } catch (err) {
            const errorMessage = {
                title: 'Authentication Error',
                status: err.response?.status || 500,
                message: err.response?.data?.detail || 'LoginForm failed. Please try again.'
            };
            setErrorProps(errorMessage);
            setErrorDialogIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles sign-up form submission
     * @async
     * @param {Object} data - Form data containing email, username and password
     * @param {string} data.email - User's email
     * @param {string} data.username - User's username
     * @param {string} data.password - User's password
     */
    const onSubmitSignUp = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.register(data.email, data.username, data.password);
            if (resp.user) {
                toast.success("Registration successful");
                navigate("/notes");
            }
        } catch (e) {
            const errorMessage = {
                title: 'Authentication Error',
                status: e.response?.status || 500,
                message: e.response?.data?.detail || 'Registration failed. Please try again.'
            };
            setErrorProps(errorMessage);
            setErrorDialogIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles Google OAuth
     * @param data
     * @param isSigning
     * @returns {Promise<void>}
     */
    const googleOAuth = async (data, isSigning = true) => {
        setIsLoading(true);
        try {
            const resp = isSigning ? await auth.googleOAuth(data) : await auth.googleAuthSignup(data);
            if (resp.user) {
                toast.success("Login successful");
                navigate("/notes");
            }
        } catch (e) {
            const errorMessage = {
                title: 'Authentication Error',
                status: e.response?.status || 500,
                message: e.response?.data?.detail || 'LoginForm failed. Please try again.'
            };
            setErrorProps(errorMessage);
            setErrorDialogIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoginForm signingForm={signingForm}
                       signupForm={signupForm}
                       onSubmitSignUp={onSubmitSignUp}
                       onSubmitSignIn={onSubmitSignIn}
                       googleOAuth={googleOAuth}
                       setTab={setTab}
                       isLoading={isLoading}
            />
            <ErrorsModal isOpen={errorDialogIsOpen}
                         onClose={() => setErrorDialogIsOpen(false)}
                         errorProps={errorProps}/>
        </>
    )
}