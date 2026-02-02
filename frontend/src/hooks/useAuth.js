import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                setLoading(false); 
            }
        };
        checkUser();
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

    return { user, loading, login, register, logout }; 
};