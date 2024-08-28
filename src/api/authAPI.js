import supabase from '../lib/supabase';

export const register = async (email, password, first_name, last_name) => {
    if (!first_name) throw new Error('First name is required');
    if (!last_name) throw new Error('Last name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}
export const login = async (email, password) => {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        throw new Error(error.message);
    } 
    return data;
}
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export const resetPassword = async (email) => {
    await supabase.auth.resetPasswordForEmail(email,
        {
            redirectTo: 'http://localhost:5173/set-new-password',
        }
    );
}

export const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        throw new Error(error.message);
    }
    return data.user;
}
