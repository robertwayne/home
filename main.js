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

function setServiceHealthUp(site, element) {
    element.classList.remove("service-down")
    element.classList.add("service-up")
    element.innerHTML = "up"

    localStorage.setItem(`${site}-health`, "up")
}

function setServiceHealthDown(site, element) {
    element.classList.remove("service-up")
    element.classList.add("service-down")
    element.innerHTML = "down"

    localStorage.setItem(`${site}-health`, "down")
}

function updateServiceHealth() {
    const sites = ["playspelldrop.com", "sombia.com"]

    let cachedLastChecked = localStorage.getItem("lastChecked")
    let lastChecked = new Date(cachedLastChecked)

    for (const site of sites) {
        const element = document.getElementById(site)

        if (cachedLastChecked && lastChecked > new Date() - 300000) {
            let cachedHealth = localStorage.getItem(`${site}-health`)
            if (cachedHealth === "up") {
                setServiceHealthUp(site, element)
            } else {
                setServiceHealthDown(site, element)
            }

            continue
        }

        fetch(`https://${site}/`)
            .then((response) => {
                if (response.status === 200) {
                    setServiceHealthUp(site, element)
                } else {
                    setServiceHealthDown(site, element)
                }
            })
            .catch((_) => {
                setServiceHealthDown(site, element)
            })
    }

    localStorage.setItem("lastChecked", new Date().toLocaleString())
}

updateServiceHealth()
setInterval(updateServiceHealth, 300000)
