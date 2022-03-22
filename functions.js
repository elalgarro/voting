const { json } = require("body-parser")
const fs = require("fs")
const getJson = () => {
    let file = fs.readFileSync("voting_status.json", 'utf8')
    return JSON.parse(file)
}

const updateVoteCount = (slug) => {
    console.log(slug)
    let json = getJson()
    let curr = json.submissions[slug].votes
    json.submissions[slug].votes = curr + 1
    return json
}

const createSubmission = (newSub) => {
    let json = getJson()
    json.submissions[newSub.slug] = { ...newSub, votes: 0 }
    return json
}

const addPhoneNumber = (number) = () => {
    let json = getJson()
    json.numbers.push(number)
    return json
}

const numberExists = (number) => {
    let json = getJson()
    return json.numbers.includes(number)
}

const listOptions = () => {
    let json = getJson();
    return Object.keys(json.submissions)
}

const clearNumbers = () => {
    let json = getJson();
    json.numbers = [];
    return json;
}

const removeSubmission = (slug) => {
    let json = getJson();
    delete json.submissions[slug]
    return json
}

const resetVotes = () => {
    let json = getJson();
    Object.keys(json.submissions).forEach(k => {
        json.submissions[k].votes = 0
    })
    return json
}

module.exports = {
    getJson,
    updateVoteCount,
    createSubmission,
    addPhoneNumber,
    numberExists,
    listOptions,
    clearNumbers,
    removeSubmission,
    resetVotes
}
