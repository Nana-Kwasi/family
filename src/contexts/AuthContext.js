import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as accountApi from '../utils/accountApi';

// Website accounts now live in our own backend rather than Firebase. The shape of this
// context is unchanged on purpose — every consumer keeps working — but `user` is a customer
// record from PostgreSQL and there is no `isAdmin`: the site has no admin area any more.

const AuthContext = createContext(null);

/**
 * The backend calls it `fullName`; the site's components were written against Firebase's
 * `name`. Expose both rather than touching every consumer for a rename.
 */
function toUser(profile) {
  return profile ? { ...profile, name: profile.fullName } : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Resolve the stored token once on load. A missing or expired token simply means signed out.
  useEffect(() => {
    let cancelled = false;
    accountApi
      .fetchProfile()
      .then((profile) => { if (!cancelled) setUser(toUser(profile)); })
      .finally(() => { if (!cancelled) setAuthLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setUser(toUser(await accountApi.login({ email, password })));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const signup = useCallback(async (name, email, password, extras = {}) => {
    try {
      setUser(toUser(await accountApi.signup({ fullName: name, email, password, ...extras })));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(async () => {
    accountApi.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profile) => {
    try {
      setUser(toUser(await accountApi.updateProfile(profile)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      await accountApi.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      const body = await accountApi.forgotPassword(email);
      return { success: true, message: body?.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const completePasswordReset = useCallback(async (token, newPassword) => {
    try {
      await accountApi.resetPassword(token, newPassword);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const value = useMemo(
    () => ({ user, authLoading, login, signup, logout, updateProfile, changePassword,
             resetPassword, completePasswordReset }),
    [user, authLoading, login, signup, logout, updateProfile, changePassword,
     resetPassword, completePasswordReset],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
