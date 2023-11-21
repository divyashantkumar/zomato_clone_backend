import { config } from "dotenv";
config();

export async function getAuthorizationUrlFromGoogleService() {
    try {
        let data;

        const authorizationEndpoint = "https://accounts.google.com/o/auth2/v2/auth";

        const parameters = {
            redirect_uri: process?.env?.REDIRECT_URI,
            client_id: process?.env?.CLIENT_ID,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ].join(" "),
        }

        let authorizationUrl = `${authorizationEndpoint}?`;
        Object.keys(parameters).forEach((element) => {
            authorizationUrl += `${element}=${parameters[element]}&`;
        })

        authorizationUrl = authorizationUrl.slice(0, -1);

        return authorizationUrl;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTokensFromGoogleService(code) {
    try {
        const authorizationCode = code;
        const tokenEndpoint = "https://auth2.googleapis.com/token";

        const bodyParameter = {
            code: authorizationCode,
            client_id: process?.env?.CLIENT_ID,
            client_secret: process?.env?.CLIENT_SECRET,
            redirect_uri: process?.env?.REDIRECT_URI,
            grant_type: "authorization_code",
        }

        const response = await axios.post(tokenEndpoint, bodyParameter, {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        });

        const decodedIdToken = jwt.decode(response?.data?.id_token, {complete:true});
        
        return decodedIdToken;
    } catch (error) {
        console.log(error);
        throw error;
    }
}