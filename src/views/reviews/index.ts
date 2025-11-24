import { reviews } from '../../Lists.ts'
import Card from '../../components/reviewcard'

export default function testimonials() {
    const testimonialsSection = document.createElement('main')
    testimonialsSection.classList.add(
        'Recenssioner',
        'flex',
        'items-center',
        'flex-col',
        'bg-light-blue',
        'p-standard',
        'rounded-standard',
        'drop-shadow-standard',
        'self-center',
        'w-[90vw]',
        'max-w-[1200px]',
        'h-[70vh]',
        'overflow-y-auto',
        'overflow-x-hidden',
        'scrollbar'
    )
    testimonialsSection.innerHTML = `
    <h1 class="font-one">Recensioner</h1>
    <h2>Vi vill alltid att du ska gå ut med ett leende!</h2>
    <p>
        Kolla hur nöjda våra kunder är!
    </p>

  `

    const reviewContainer = document.createElement('div')
    reviewContainer.classList.add(
        'grid',
        'grid-cols-1',
        'gap-4',
        'sm:grid-cols-2',
        'lg:grid-cols-3'
    )

    /*    reviews.forEach((review) => {
        const card = Card(review)
        reviewContainer.append(card)
    })
 */
    reviewContainer.append(...reviews.map(Card))
    testimonialsSection.append(reviewContainer)

    // i slutändan returneras elementet som skapades med document.createElement("div")
    return testimonialsSection
}
