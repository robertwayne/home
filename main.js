document.getElementById('greeting').innerText = setGreeting()

function setGreeting() {
    let now = new Date().getHours()

    if (now >= 4 && now <= 11) {
        return 'morning'
    } else if (now >= 12 && now <= 18) {
        return 'afternoon'
    } else {
        return 'evening'
    }
}