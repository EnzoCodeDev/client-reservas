import { createContext, useEffect, useReducer } from "react";

// Estado inicial, recuperando el usuario desde el localStorage si existe
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// Creamos el contexto con el estado inicial
export const AuthContext = createContext(INITIAL_STATE);

// Reducer para manejar las acciones de login y logout
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Componente que envuelve toda la aplicación y proporciona el estado y los métodos a través del contexto
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Efecto para sincronizar el estado de usuario con el localStorage
  useEffect(() => {
    if (state.user) {
      // Si hay usuario, lo guardamos en localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      // Si no hay usuario, eliminamos los datos del localStorage
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Función para hacer logout y borrar los datos del usuario
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
