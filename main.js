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

function setServiceHealthUp(element) {
    element.classList.remove("service-down")
    element.classList.add("service-up")
    element.innerHTML = "up"
}

function setServiceHealthDown(element) {
    element.classList.remove("service-up")
    element.classList.add("service-down")
    element.innerHTML = "down"
}

function updateServiceHealth() {
    const sites = ["spelldrop.gg", "sombia.com"]

    let cachedLastChecked = localStorage.getItem("lastChecked")
    let lastChecked = new Date(cachedLastChecked)

    for (const site of sites) {
        const element = document.getElementById(site)

        if (cachedLastChecked && lastChecked > new Date() - 300000) {
            let cachedHealth = localStorage.getItem(`${site}-health`)
            if (cachedHealth === "true") {
                setServiceHealthUp(element)
            } else {
                setServiceHealthDown(element)
            }

            continue
        }

        fetch(`https://${site}/api/v1/health`)
            .then((response) => {
                if (response.status === 200) {
                    setServiceHealthUp(element)
                    localStorage.setItem(`${site}-health`, true)
                } else {
                    setServiceHealthDown(element)
                    localStorage.setItem(`${site}-health`, false)
                }
            })
            .catch((_) => {
                setServiceHealthDown(element)
                localStorage.setItem(`${site}-health`, false)
            })
    }

    localStorage.setItem("lastChecked", new Date().toLocaleString())
}

updateServiceHealth()
setInterval(updateServiceHealth, 300000)
