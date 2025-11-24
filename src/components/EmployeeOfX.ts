import { getRaccoonImage } from "../api.ts";
/**
 * Skapar en sektion som visar "Employee of X"-kort.
 * Använder ren DOM-manipulation utan innerHTML för bättre struktur.
 */

const daily = await getRaccoonImage("daily");
const hourly = await getRaccoonImage("hourly");
const weekly = await getRaccoonImage("weekly");

export function createEmployeeOfXSection(): HTMLElement {
  // 1. Skapa wrappern
  const section = document.createElement("section");
  section.classList.add(
    "employee-section", // Bra för specifik CSS-targeting vid behov
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-8",
    "p-6",
    "mt-6"
  );

  // Data för korten för att undvika kodupprepning
  const employees = [
    {
      src: daily.data?.url,
      title: "Timmes arbetare är Raccoon",
      desc: "Specialist på 'Deep Clean'. Råkade tvätta tre kunders mobiltelefoner i tron att de var musslor, men handdukarna har aldrig varit renare.",
    },
    {
      src: hourly.data?.url,
      title: "Dagliga arbetare är Raccoon",
      desc: "Ansvarig för gurkmasker. Har tyvärr ätit upp alla gurkskivor som skulle ligga på dina ögon, men erbjuder utmärkt 'knådnings-massage' med små klor.",
    },
    {
      src: weekly.data?.url,
      title: "Veckliga arbetare är Raccoon",
      desc: "Head of Lerbad. Hävdar bestämt att leran från diket bakom pizzerian har bäst mineraler. Tar betalt i glittrande föremål.",
    },
  ];

  // 2. Loopa igenom datan och skapa kort
  employees.forEach((emp) => {
    const card = document.createElement("article");
    card.classList.add(
      "bg-white/80",
      "rounded-xl",
      "shadow-lg",
      "p-4",
      "max-w-xs",
      "flex",
      "flex-col",
      "items-center",
      "text-center",
      "backdrop-blur-sm" // Liten extra touch för modernare look
    );

    const img = document.createElement("img");
    img.src = String(emp.src);
    img.alt = "Raccoon employee";
    img.classList.add("w-32", "h-32", "rounded-full", "object-cover", "mb-3");

    const title = document.createElement("h3");
    title.textContent = emp.title;
    title.classList.add("font-semibold", "text-lg", "mb-1", "text-slate-800");

    const text = document.createElement("p");
    text.textContent = emp.desc;
    text.classList.add("text-sm", "text-slate-600");

    // Sätt ihop kortet
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);

    // Lägg till kortet i sektionen
    section.appendChild(card);
  });

  return section;
}
console.log(String(daily.data?.url));
