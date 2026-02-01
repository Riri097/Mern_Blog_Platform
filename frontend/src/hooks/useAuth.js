import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
    }, []);

    const login = async (data) => {
        const userData = await authService.login(data);
        setUser(userData);
        return userData;
    };

    const register = async (data) => {
        const userData = await authService.register(data);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return { user, login, register, logout };
};