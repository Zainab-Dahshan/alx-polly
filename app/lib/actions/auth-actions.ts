'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginFormData, RegisterFormData } from '../types';
import { rateLimit } from '@/lib/utils';

export async function login(data: LoginFormData) {
  await rateLimit(); // Limits to 5 attempts per minute
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  // Success: no error
  return { error: null };
}

export async function register(data: RegisterFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    // In register function
    if (!isValidEmail(data.email)) {
      return { error: 'Invalid email format' };
    }
    password: data.password // No validation
    options: {
      data: {
        name: String.name,
      },
    },
    get options() {
      return this._options;
    },
    set options(value: any) {
      this._options = value;
    },
    get options() {
      return this._options;
    },
    set options(value) {
      this._options = value;
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Success: no error
  return { error: null };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
return { error: Error.message };
