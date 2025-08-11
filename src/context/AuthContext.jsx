import { createContext } from 'react'

export const AuthContext = createContext( {
    user: null,
    loading: true,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    loginWithGoogle: () => Promise.resolve(),
    loginWithGithub: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    updateUserProfile: () => Promise.resolve(),
} )

