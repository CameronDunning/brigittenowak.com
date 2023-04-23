import { create } from 'zustand'

type UserStoreState = {
    user: any
    setUser: (user: any) => void
}

const UserStore = create<UserStoreState>()(set => ({
    user: null,
    setUser: (user: any) => set({ user }),
}))

export const useUser = () => UserStore(state => state.user)
export const useSetUser = () => UserStore(state => state.setUser)
