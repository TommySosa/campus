import {create} from 'zustand';

export const useStore = create((set) => ({
    session: null,
    setSession: (session) => set({session}),
    user: null,
    setUser: (user) => set({user}),
}));

// export const useFetch = async (url, options) => {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data;
// }

export const useFetch = create((set) => ({
    data: [],
    setData: (data) => set({data}),
    fetch: async (url, options) => {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
}))
