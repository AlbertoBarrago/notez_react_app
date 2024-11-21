/**
 * @fileoverview Authentication route component handling login and registration
 * @module AuthRoute
 */

'use client'

import {useState} from "react";
import AuthService from "@/services/login/login.js";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginForm} from "@/components/loginForm.jsx";

/** @constant {string} */
const SIGN_IN = "signin";

/**
 * Main authentication part handling both sign-in and sign-up functionality
 * @function AuthRoute
 * @returns {JSX.Element} Rendered authentication component
 */
export default function AuthRoute() {
    /**
     * @type {[boolean, Function]} Loading state and setter
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * @type {AuthService} Authentication service instance
     */
    const auth = new AuthService();

    /**
     * @type {[string, Function]} Active tab state and setter
     */
        // eslint-disable-next-line no-unused-vars
    const [tab, setTab] = useState(SIGN_IN);

    /**
     * @type {[boolean, Function]} Error modal visibility state and setter
     */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * @type {[Object, Function]} Error properties state and setter
     */
    const [errorProps, setErrorProps] = useState({});

    /**
     * * @type {import('react-router-dom').NavigateFunction} Navigation function for route transitions
     * */
    const navigate = useNavigate();

    /**
     * @type {Object} Form control for sign-in
     */
    const signingForm = useForm();

    /**
     * @type {Object} Form control for sign-up
     */
    const signupForm = useForm();

    /**
     * Handles sign-in form submission
     * @async
     * @param {Object} data - Form data containing username and password
     * @param {string} data.username - User's username
     * @param {string} data.password - User's password
     */
    const onSubmitSignIn = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.login(data.username, data.password);
            if (resp.user) {
                navigate("/notes");
            }
        } catch (err) {
            const errorMessage = {
                title: 'Authentication Error',
                status: err.response?.status || 500,
                message: err.response?.data?.detail || 'LoginForm failed. Please try again.'
            };
            setErrorProps(errorMessage);
            setIsModalOpen(true);
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
                navigate("/notes");
            }
        } catch (e) {
            setErrorProps(e);
            setIsModalOpen(true);
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
                navigate("/notes");
            }
        } catch (e) {
            setErrorProps(e);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LoginForm signingForm={signingForm}
                   signupForm={signupForm}
                   onSubmitSignUp={onSubmitSignUp}
                   onSubmitSignIn={onSubmitSignIn}
                   onGoogleOAuth={googleOAuth}
                   setIsModalOpen={setIsModalOpen}
                   setTab={setTab}
                   isLoading={isLoading}
                   isModalOpen={isModalOpen}
                   googleOAuth={googleOAuth}
                   errorProps={errorProps}
        />
    )
}