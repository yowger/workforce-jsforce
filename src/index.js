var jsforce = require("jsforce")
var express = require("express")
var dotenv = require("dotenv")
var cors = require("cors")

dotenv.config({ path: ".env" })

const app = express()
app.use(cors())

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

    res.status(200).json({
        accessToken: conn.accessToken,
        instanceUrl: conn.instanceUrl,
        userId: userInfo.id,
        orgId: userInfo.organizationId,
    })
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
