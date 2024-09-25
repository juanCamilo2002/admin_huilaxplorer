import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "email", placeholder: "Correo Electrónico" },
                password: { label: "Contraseña", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();

                    if (res.ok && user.access) {
                        // get user info
                        const userInfoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
                            headers: {
                                Authorization: `Bearer ${user.access}`,
                            },
                        });

                        const userInfo = await userInfoResponse.json();

                        // validate staff status
                        if (!userInfo.is_staff && !userInfo.is_superuser) {
                            throw new Error("Usuario no autorizado");
                        }

                        return {
                            id: userInfo.id,
                            email: userInfo.email,
                            isStaff: userInfo.is_staff,
                            isSuperuser: userInfo.is_superuser,
                            accessToken: user.access,
                            refreshToken: user.refresh,
                            user: userInfo,
                        }
                    } else {
                        throw new Error(user.detail || "Credenciales inválidas");
                    }
                } catch (err) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.isStaff = user.isStaff;
                token.isSuperuser = user.isSuperuser;
                token.accessTokenExpires = Date.now() + 2 * 60 * 1000; // 2 minutos de validez
                token.user = user;
            }

            // Si el token aún es válido, retórnalo
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Si el token ha expirado, intenta refrescarlo
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.error = token.error;
            session.isStaff = token.isStaff;
            session.isSuperuser = token.isSuperuser;
            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: "/login", 
        error: "/auth/error"
    },
    secret: process.env.NEXTAUTH_SECRET,
});

async function refreshAccessToken(token) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refreshToken }),
        });

        const refreshedTokens = await res.json();

        if (!res.ok) {
            throw refreshedTokens;
        }

        
        return {
            ...token,
            accessToken: refreshedTokens.access,
            accessTokenExpires: Date.now() + 2 * 60 * 1000, 
            refreshToken: refreshedTokens.refresh ?? token.refreshToken, 
        };
    } catch (error) {
        console.error("Error al refrescar el token:", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
            accessToken: null,
            refreshToken: null,
        };
    }
}

export { handler as GET, handler as POST };
