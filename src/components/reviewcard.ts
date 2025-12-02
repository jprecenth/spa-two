function getInitials(name: string) {
    // Delar upp namnet i ord för att vi vill kunna hantera både
    // för- och efternamn.
    const names = name.split(' ')
    // Plockar ut första bokstaven i varje ord eftersom syftet
    // är att skapa en avatar som fungerar även när vi saknar bild.
    return names.map((name) => name[0]).join('')
}

function createAvatar(name: string) {
    const avatar = document.createElement('div')
    avatar.classList.add(
        'rounded-full',
        'bg-orange-200',
        'aspect-square',
        'h-12',
        'flex',
        'items-center'
    )

    const initials = document.createElement('p')
    initials.classList.add('m-auto')
    initials.textContent = getInitials(name)

    avatar.append(initials)
    return avatar
}

function createCustomerSection(name: string) {
    const customer = document.createElement('div')
    customer.classList.add('flex', 'gap-4', 'items-center', 'mt-auto')

    const avatar = createAvatar(name)

    const h3 = document.createElement('h3')
    h3.classList.add('font-bold')
    h3.textContent = name

    customer.append(avatar, h3)
    return customer
}

function createStars(rating: number) {
    // Samlar stjärnlogiken på ett ställe för att göra card-komponenten renare.
    // På så sätt kan stjärnor återanvändas i andra komponenter och
    // rating-reglerna är enkla att ändra utan att röra hela card-koden.
    const stars = document.createElement('div')
    stars.classList.add(
        'stars',
        'text-orange-300',
        'text-shadow-sm/40',
        'text-xl'
    )

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span')
        star.textContent = i <= rating ? '★' : '☆'
        star.className = i <= rating ? 'star filled' : 'star'
        stars.append(star)
    }

    return stars
}

export interface cardProps {
    rating: number
    text: string
    name: string
}
export default function Card({ rating, text, name }: cardProps) {
    const card = document.createElement('div')
    card.classList.add(
        'card',
        'flex',
        'flex-col',
        'gap-4',
        'bg-amber-50',
        'hover:bg-amber-100',
        'duration-150',
        'w-xs',
        'p-standard',
        'rounded-2xl',
        'mt-3'
    )
    const stars = createStars(rating)

    const p = document.createElement('p')
    p.textContent = text

    const customer = createCustomerSection(name)

    // Här sammanställs allt i rätt ordning – betyg först, sedan text,
    // och sist användarinformation.
    card.append(stars, p, customer)

    // Returnerar ett färdigt DOM-element som kan placeras fritt i UI.
    return card
}
