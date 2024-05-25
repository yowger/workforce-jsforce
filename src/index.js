var jsforce = require("jsforce")
var dotenv = require("dotenv")

dotenv.config({ path: ".env" })

const LOGIN_URL = process.env.JSFORCE_LOGIN_URL
const conn = new jsforce.Connection({
    loginUrl: LOGIN_URL,
})

async function jsForceLogin(username, password, token) {
    try {
        const userInfo = await conn.login(username, password + token)
        return userInfo
    } catch (error) {
        console.error("JsForce Login failed: " + error)
        throw error
    }
}

async function main() {
    const USERNAME = process.env.JSFORCE_USERNAME
    const PASSWORD = process.env.JSFORCE_PASSWORD
    const TOKEN = process.env.JSFORCE_SECURITY_TOKEN

    const userInfo = await jsForceLogin(USERNAME, PASSWORD, TOKEN)
    console.log("user data: " + userInfo)
}

main()
