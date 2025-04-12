import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserRole = "freelancer" | "business" | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  availability?: string;
  phone?: string;
  location?: string;
  companyName?: string;
  industry?: string;
  website?: string;
  // Add more user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (
    userData: Partial<User>,
    password: string,
    role: UserRole,
  ) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix Fast Refresh compatibility issue by making this a named function declaration
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split("@")[0], // Just using part of email as name for demo
        role,
      };

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Partial<User>,
    password: string,
    role: UserRole,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call to register
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email || "",
        name: userData.name || "",
        role,
      };

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call to update the profile
      // For demo purposes, we'll update the user in localStorage
      if (user) {
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    updateProfile,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
