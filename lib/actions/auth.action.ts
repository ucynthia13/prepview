"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; 

export async function signup (params: SignUpParams){
    const { uid, email, name } = params;
    try {
        const userRecord = await db.collection("users").doc(uid).get()

        if(userRecord.exists){
            return{
                success: false,
                message: "User already exists",
            }
        }
    
        await db.collection("users").doc(uid).set({
            name, email
        })
    } catch (error: any) {
        if(error.code === "auth/email-already-exists"){
            return {
                success: false,
                message: "Email already exists"
            }
        }
        if(error.code === "auth/invalid-email"){
            return {
                success: false,
                message: "Invalid email"
            }
        }
        return {
            success: false, 
            message: error.message
        }
    }

}

export async function login (params: SignInParams){
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email)
        if(!userRecord){
            return {
                success: false,
                message: "User not found. Create an account",
            }
        }
        await setSessionCookie(idToken)
    }catch (error: any) {   
        console.error(error)
        return {
            success: false,
            message: error.message
        }
    }

}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies()
    const sessionStore = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK *1000
    })
    
    cookieStore.set("session", sessionStore, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    })
}