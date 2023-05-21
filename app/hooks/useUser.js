import { getCurrentUser } from "../../utils/data";
import supabase from "../../utils/supabase";
import { useRef, useEffect, useState } from "react";

const useUser = () => {
  const isMounted = useRef(false);

  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);

  const refreshUser = async () => {
    setError(undefined);
    setUser(undefined);
    getUser();
  };

  const getUser = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser.success) {
      setError(currentUser.error);
      return;
    }

    if (!currentUser.data) {
      setUser(null);
      return;
    }

    setUser(currentUser.data);
  };

  useEffect(() => {
    if (!isMounted.current) {
      const { subscription } = supabase.auth.onAuthStateChange(
        authStateChangeListener
      );
      getUser();
      isMounted.current = true;
      return () => {
        subscription?.unsubscribe();
      };
    }
  }, []);

  const authStateChangeListener = (event, session) => {
    if (["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
      getUser();
    }
  };

  return {
    user,
    error,
    refreshUser,
    loading: user === undefined,
  };
};

export default useUser;
