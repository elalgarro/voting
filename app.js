const fs = require('fs')
const express = require('express')
const expressLayouts = require("express-ejs-layouts")
const HTTPResponse = require("./HttpResponse.json")
const functions = require("./functions")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const formParser = bodyParser.urlencoded()
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/js", express.static(__dirname + "public/js"))
app.use(expressLayouts)
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    let json = functions.getJson()
    let submissions = Object.keys(json.submissions).map(k => json.submissions[k])
    res.render("index", { submissions })
})
app.get("/submissions", async (req, res) => {
    let json = await functions.getJson()
    res.status(HTTPResponse.OK).send(json)
})

app.get("/submissions/new", (req, res) => {
    res.render("new")
})

app.post("/submissions", formParser, (req, res) => {
    console.log(req.body)
    const json = functions.createSubmission(req.body)
    fs.writeFileSync("./voting_status.json", JSON.stringify(json))
    res.redirect('/')
})

app.delete(`/submissions/:slug`, (req, res) => {
    const json = functions.removeSubmission(req.params.slug);
    fs.writeFileSync("./voting_status.json", JSON.stringify(json))
    res.redirect('/')
})

app.post("/reset-votes", (req, res) => {
    const voteReset = functions.resetVotes();
    fs.writeFileSync("./voting_status.json", JSON.stringify(voteReset))
    const numbersReset = functions.clearNumbers();
    fs.writeFileSync("./voting_status.json", JSON.stringify(numbersReset))
    res.status(HTTPResponse.OK).send(numbersReset)
})

app.post("/message", jsonParser, (req, res) => {
    let body = req.body
    let json = functions.updateVoteCount(body.slug)
    fs.writeFileSync("./voting_status.json", JSON.stringify(json))
    res.status(HTTPResponse.OK).send(json)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



