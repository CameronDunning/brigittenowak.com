import { create } from 'zustand'

type UserState = {
    user: any
    setUser: (user: any) => void
}

const UserStore = create<UserState>()(set => ({
    user: null,
    setUser: (user: any) => set({ user }),
}))

export const useUser = () => UserStore(state => state.user)
export const useSetUser = () => UserStore(state => state.setUser)
