"use server"

import { signOut } from "../auth"

export const logout = async () => {

    //any server stuff before logout

    await signOut()
}