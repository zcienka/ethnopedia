import jwt from "jsonwebtoken"

require("dotenv").config()

export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined,
) {
    const signingKey = Buffer.from(
        process.env.ACCESS_TOKEN_SECRET as string,
        "base64",
    ).toString("ascii")

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    })
}

export function verifyJwt<T>(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
): T | null {
    const publicKey = Buffer.from(process.env.ACCESS_TOKEN_SECRET as string, "base64").toString(
        "ascii",
    )

    try {
        return jwt.verify(token, publicKey) as T
    } catch (e) {
        return null
    }
}
