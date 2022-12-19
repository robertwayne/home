document.getElementById("greeting").innerText = setGreeting()

function setGreeting() {
    let now = new Date().getHours()

    if (now >= 4 && now <= 11) {
        return "morning"
    } else if (now >= 12 && now <= 18) {
        return "afternoon"
    } else {
        return "evening"
    }
}

function queryServiceHealth() {
    const sites = ["spelldrop.gg", "sombia.com"]

    for (const site of sites) {
        const element = document.getElementById(site)
        fetch(`https://${site}/api/v1/health`)
            .then((response) => {
                if (response.status === 200) {
                    element.classList.remove("service-down")
                    element.classList.add("service-up")
                    element.innerHTML = "up"
                } else {
                    element.classList.remove("service-up")
                    element.classList.add("service-down")
                    element.innerHTML = "down"
                }
            })
            .catch((_) => {
                element.classList.remove("service-up")
                element.classList.add("service-down")
                element.innerHTML = "down"
            })
    }
}

queryServiceHealth()
setInterval(queryServiceHealth, 300000)
