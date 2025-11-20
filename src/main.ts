// import { check } from "prettier";
//import javascriptLogo from "./javascript.svg";
//import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
//import about from "./views/about/index.js";
import './style.css'
import { makeIcon } from './components/icon.ts'
import home from './views/home'
import book from './views/book'
import staffView from './views/staff'
import testimonials from './views/reviews/index.ts'
import treatments from './views/treatments/index.ts'
import headerHTML from './views/static/header/index.html?raw'
import footerHTML from './views/static/footer/index.html?raw'

const app = document.querySelector('#app') as HTMLElement

const getCurrentPage = (): string | HTMLElement => {
    const currentPage = window.location.pathname

    switch (currentPage) {
        case '/home':
            return home()
        case '/book':
            return book()
        case '/staff':
            return staffView()
        case '/treatments':
            return treatments()
        case '/testimonials':
            return testimonials()
        default:
            return (window.location.pathname = '/home')
    }
}

const renderApp = () => {
    const currentPage = getCurrentPage()

    if (typeof currentPage === 'string') {
        app.innerHTML = `
      ${headerHTML}
      ${currentPage}
      ${footerHTML}
      `
    } else {
        app.innerHTML = `
      ${headerHTML}
      ${footerHTML}
      `

        app?.insertBefore(currentPage, app.querySelector('footer')!)
    }

    // Generic Icons //
    const checkIcon = makeIcon('approve', 20, 20)
    const starIcon = makeIcon('star', 20, 20)
    const racoonIcon = makeIcon('raccoon', 20, 20)
    const spaIcon = makeIcon('bubbles', 20, 20)
    const homeIcon = makeIcon('home', 20, 20)

    // Treatment Icons //
    const hairIcon = makeIcon('harvard', 30, 30)
    const coupleIcon = makeIcon('forCouples', 30, 30)
    const footIcon = makeIcon('fotvard', 30, 30)
    const massageIcon = makeIcon('massage', 30, 30)
    const meditationIcon = makeIcon('meditation', 30, 30)
    const exerciseIcon = makeIcon('traning', 30, 30)
    const skinIcon = makeIcon('bubbles', 30, 30)

    document.querySelector('.hem')?.append(homeIcon)
    document.querySelector('.bookFooter')?.prepend(checkIcon)
    document.querySelector('.reviewsFooter')?.prepend(starIcon)
    document.querySelector('.staffFooter')?.prepend(racoonIcon)
    document.querySelector('.treatmentsFooter')?.prepend(spaIcon)

    const menuContainer = document.querySelector('.menuContainer')
    if (menuContainer) {
        let listOfIcons = []
        listOfIcons.push(
            skinIcon,
            hairIcon,
            coupleIcon,
            footIcon,
            massageIcon,
            meditationIcon,
            exerciseIcon
        )

        for (let icon of listOfIcons) {
            let linky = document.createElement('a')
            linky.href = '/treatments'
            linky.classList.add('rounded-standard')
            linky.append(icon)
            menuContainer.append(linky)
        }
    }
}

renderApp()
