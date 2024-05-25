var jsforce = require("jsforce")
var dotenv = require("dotenv")

dotenv.config({ path: ".env" })

const conn = new jsforce.Connection({
    loginUrl: "https://test.salesforce.com",
})

async function jsForceLogin(username, password) {
    try {
        const userInfo = await conn.login(username, password)
        return userInfo
    } catch (error) {
        console.error("JsForce Login failed: " + error)
        throw error
    }
}

async function main() {
    const username = process.env.JSFORCE_USERNAME
    const password = process.env.JSFORCE_PASSWORD

    const userInfo = await jsForceLogin(username, password)
    console.log("user data: " + userInfo)
}

main()
