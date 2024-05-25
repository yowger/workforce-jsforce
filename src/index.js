var jsforce = require("jsforce")
var dotenv = require("dotenv")

dotenv.config({ path: ".env" })

const LOGIN_URL = process.env.JSFORCE_LOGIN_URL
const conn = new jsforce.Connection({
    loginUrl: LOGIN_URL,
})

async function jsForceLogin(username, password, token) {
    return new Promise((resolve, reject) => {
        conn.login(username, password + token, function (error, userInfo) {
            if (error) {
                reject(error)
            } else {
                resolve(userInfo)
            }
        })
    })
}

async function main() {
    try {
        const USERNAME = process.env.JSFORCE_USERNAME
        const PASSWORD = process.env.JSFORCE_PASSWORD
        const TOKEN = process.env.JSFORCE_SECURITY_TOKEN

        const userInfo = await jsForceLogin(USERNAME, PASSWORD, TOKEN)
        console.log("user id: " + userInfo.id)
        console.log("user info: " + userInfo.url)
        console.log("user org: " + userInfo.organizationId)
    } catch (error) {
        console.error("Login failed:", error)
    }
}

main()
