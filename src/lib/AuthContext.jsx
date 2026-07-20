import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState({
    id: "beninease",
    public_settings: {
      name: "Beninease",
      description: "Plateforme d'expériences culturelles et d'ateliers du Bénin"
    }
  });

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      
      // Load user from localStorage if it exists
      const savedUser = localStorage.getItem('local_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setIsLoadingAuth(false);
      setAuthChecked(true);
      setIsLoadingPublicSettings(false);
    } catch (error) {
      console.error('App state check failed:', error);
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const checkUserAuth = async () => {
    return isAuthenticated;
  };

  const loginWithEmail = async (email, password) => {
    const registeredUsersStr = localStorage.getItem('registered_users') || '[]';
    const registeredUsers = JSON.parse(registeredUsersStr);
    
    let existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!existingUser) {
      // For a seamless demo experience, register directly
      existingUser = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email: email,
        firstName: email.split('@')[0],
        lastName: 'User',
        role: 'spectator'
      };
      registeredUsers.push(existingUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    }

    localStorage.setItem('local_user', JSON.stringify(existingUser));
    setUser(existingUser);
    setIsAuthenticated(true);
    return existingUser;
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      id: `user_google_${Math.random().toString(36).substr(2, 9)}`,
      email: 'visiteur.benin@gmail.com',
      firstName: 'Jean',
      lastName: 'Koffi',
      role: 'spectator'
    };
    localStorage.setItem('local_user', JSON.stringify(googleUser));
    setUser(googleUser);
    setIsAuthenticated(true);
    return googleUser;
  };

  const registerWithEmail = async (email, password, metadata) => {
    const registeredUsersStr = localStorage.getItem('registered_users') || '[]';
    const registeredUsers = JSON.parse(registeredUsersStr);
    
    const newUser = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      firstName: metadata.firstName || '',
      lastName: metadata.lastName || '',
      role: metadata.role || 'spectator'
    };
    
    const filtered = registeredUsers.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    filtered.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(filtered));
    
    localStorage.setItem('local_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const resetPassword = async (email) => {
    return true;
  };

  const logout = async () => {
    localStorage.removeItem('local_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState,
      loginWithEmail,
      loginWithGoogle,
      registerWithEmail,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
