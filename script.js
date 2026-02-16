import { Fireworks } from 'https://cdn.jsdelivr.net/npm/fireworks-js@2.x/dist/index.es.js'

const container = document.getElementById('fireworks-container')

const fireworks = new Fireworks(container, {
    autoresize: true,
    opacity: 0.7,

    acceleration: 1.02,
    friction: 0.97,
    gravity: 1.5,

    particles: 180,
    intensity: 120,
    delay: { min: 50, max: 100 },

    traceLength: 4,
    traceSpeed: 10,

    explosion: 6.8,
    flickering: 55,
    lineStyle: 'round',

    hue: { min: 0, max: 360 },

    rocketsPoint: { min: 10, max: 90 },

    lineWidth: {
        explosion: { min: 1, max: 3 },
        trace: { min: 1, max: 2 }
    },

    brightness: { min: 60, max: 90 },

    decay: { min: 0.015, max: 0.025 },

    mouse: { click: true, move: false, max: 1 }
})

const countdownEl = document.getElementById('countdown')
countdownEl.classList.remove('hidden')
const greeting = document.getElementById('greeting')
const year = document.getElementById('year')
const nextBtn = document.getElementById('nextPageBtn')

function getNextMidnight() {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    return midnight
}


const targetTime = getNextMidnight()

const timer = setInterval(() => {
    const now = new Date()
    const diff = targetTime - now

    if (diff <= 0) {
        clearInterval(timer)
        showNewYear()
        return
    }

    const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
    const m = String(Math.floor(diff % 3600000 / 60000)).padStart(2, '0')
    const s = String(Math.floor(diff % 60000 / 1000)).padStart(2, '0')

    countdownEl.textContent = `${h}:${m}:${s}`
}, 1000)

function showNewYear() {
    countdownEl.style.display = 'none'

    greeting.classList.remove('hidden')
    year.classList.remove('hidden')

    greeting.classList.add('show')
    year.classList.add('show')

    setTimeout(() => {
        fireworks.start()

        setInterval(() => {
            const styles = [
                { particles: 140, explosion: 6 },
                { particles: 220, explosion: 8 },
                { particles: 90,  explosion: 4 },
                { particles: 180, explosion: 10 }
            ]

            fireworks.updateOptions(
                styles[Math.floor(Math.random() * styles.length)]
            )
        }, 2200)
    }, 1500)
    setTimeout(() => {
        nextBtn.classList.remove('hidden')
        nextBtn.classList.add('bottom-right', 'show')
    }, 13500)
}

nextBtn.addEventListener('click', () => {
    window.location.href = 'love.html'
})
