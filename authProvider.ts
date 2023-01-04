import { notification } from '@pankod/refine-antd';
import { AuthProvider } from '@pankod/refine-core';
import { supabaseClient } from 'utility';

const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    const { user, error } = await supabaseClient.auth.signIn({
      email,
      password,
      provider: providerName,
    });
    console.log({ login: { user, error } });

    if (error) {
      return Promise.reject(error);
    }

    if (user) {
      return Promise.resolve();
    }

    // for third-party login
    return Promise.resolve(false);
  },
  register: async ({ email, password }) => {
    const { user, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    console.log({ register: { user, error } });

    if (error) {
      return Promise.reject(error);
    }

    if (user) {
      return Promise.resolve();
    }
  },
  forgotPassword: async ({ email }) => {
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      }
    );

    if (error) {
      return Promise.reject(error);
    }

    if (data) {
      notification.open({
        type: 'success',
        message: 'Success',
        description:
          "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
      });
      return Promise.resolve();
    }
  },
  updatePassword: async ({ password }) => {
    const { data, error } = await supabaseClient.auth.update({ password });

    if (error) {
      return Promise.reject(error);
    }

    if (data) {
      return Promise.resolve('/');
    }
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve('/');
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const session = supabaseClient.auth.session();
    const sessionFromURL = await supabaseClient.auth.getSessionFromUrl();

    if (session || sessionFromURL?.data?.user) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: async () => {
    const user = supabaseClient.auth.user();

    if (user) {
      return Promise.resolve(user.role);
    }
  },
  getUserIdentity: async () => {
    const user = supabaseClient.auth.user();

    if (user) {
      return Promise.resolve({
        ...user,
        name: user.email,
      });
    }
  },
};

export default authProvider;
