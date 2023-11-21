import * as googleOAuthServices from '../service/oAuth.google.service.js'
import { config } from "dotenv";
config();

export async function getAuthorizationUrlFromGoogle(req, res, next) {
    try {
        const data = await googleOAuthServices.getAuthorizationUrlFromGoogleService();

        res?.status(200)?.send({"data": data});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTokensFromGoogle(req, res, next) {
    try {
        const code = req?.query?.code;
        const decodedIdToken = await googleOAuthServices.getTokensFromGoogleService(code);

        if (decodedIdToken?.payload?.email && decodedIdToken?.payload?.email_verified) {
            tokenSignature = {
                userData: {
                    email: decodedIdToken?.payload?.email,
                    name: decodedIdToken?.payload?.name,
                    picture: decodedIdToken?.payload?.picture,
                }
            }


            const token = jwt?.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), ...tokenSignature }, 'privetkey', { algorithm: 'HS256' });

            //Find out if User already exists in DB
            //create a service to achieve above

            //If not exist save user data in DB
            //create a service to achieve above

            //Create a user session
            res?.send(200)?.cookie("token", `Bearer ${token}`, {
                maxAge: 36_00_000,
                httpOnly: false,
                domain: process?.env?.DOMAIN,
                path: '/',
                sameSite: 'None',
                secure: true,
            });

            res.redirect(process?.env?.REDIRECT_TO_HOME)
        } else {
            res.redirect(process?.env?.REDIRECT_TO_ERROR_PAGE)
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}