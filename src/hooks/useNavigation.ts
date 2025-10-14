import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

/**
 * Custom hook for navigation with consistent patterns
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goToWithDelay = useCallback(
    (path: string, delay: number = 1000) => {
      setTimeout(() => navigate(path), delay);
    },
    [navigate]
  );

  const replace = useCallback(
    (path: string) => {
      navigate(path, { replace: true });
    },
    [navigate]
  );

  return {
    goTo,
    goBack,
    goToWithDelay,
    replace,
  };
};
