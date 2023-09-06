import {create} from 'zustand';

export const useStore = create((set) => ({
    session: null,
    setSession: (session) => set({session}),
    user: null,
    setUser: (user) => set({user}),
}));