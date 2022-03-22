

function deleteSubmission(slug) {
    fetch(`/submissions/${slug}`, {
        method: "DELETE"
    }).then(() => {
        window.location.reload()
    })
}

function resetVotes() {
    fetch("/reset-votes", {
        method: "POST"
    }).then(() => {
        window.location.reload()
    })
}

function vote(slug) {
    console.log(slug)
    fetch("/message", {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            slug: slug
        })
    }).then(() => {
        window.location.reload()
    })
}