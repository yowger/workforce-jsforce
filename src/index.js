var jsforce = require("jsforce")
var express = require("express")
var dotenv = require("dotenv")

dotenv.config({ path: ".env" })

const app = express()

const oauth2 = new jsforce.OAuth2({
    loginUrl: "https://login.salesforce.com",
    clientId: process.env.JSFORCE_KEY,
    clientSecret: process.env.JSFORCE_SECRET,
    redirectUri: "http://localhost:5173/oauth/callback",
})

app.get("/oauth/auth", function (req, res) {
    res.redirect(oauth2.getAuthorizationUrl({ scope: "full" }))
})

app.get("/oauth/callback", async function (req, res) {
    const conn = new jsforce.Connection({ oauth2: oauth2 })
    const code = req.query.code

    const userInfo = await conn.authorize(code)

    console.log(conn.accessToken)
    console.log(conn.refreshToken)
    console.log(conn.instanceUrl)
    console.log("User ID: " + userInfo.id)
    console.log("Org ID: " + userInfo.organizationId)

    res.send("success")
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
