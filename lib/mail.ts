import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const url = process.env.URL
const sender = "mail@tasktale.com"

export const sendTwoFactorTokenEmail = async (
    email:string, 
    token:string,    
) => {
    await resend.emails.send({
        from: sender,
        to: email,
        subject: "Two-Factor Authentication code",
        html: `<p>Your 2FA code: ${token}</p>`
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string
)=> {
    const confirmLink =  `${url}/new-verification?token=${token}`;

    await resend.emails.send({
        from: sender,
        to: email,
        subject: "Confirm your email",
        html: `<p>click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token:string) => {
    const resetLink = `${url}/new-password?token=${token}`

    await resend.emails.send({
        from: sender,
        to: email,
        subject: "Reset Password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password for your account.</p>`
    })
}