import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'donor' | 'receiver' | 'admin' | null;

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    hasAcceptedSafetyCommitment: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

function loadUserFromStorage(): User | null {
    try {
        const token = localStorage.getItem('token');
        const stored = localStorage.getItem('user');
        if (!token || !stored) return null;
        if (isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return null;
        }
        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(loadUserFromStorage);

    const login = (userData: User) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = (updates: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, ...updates };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};