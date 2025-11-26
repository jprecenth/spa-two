import { getRaccoonImage } from "../api.ts";
import { staffList } from "../Lists.ts";
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
    "p-4",
    "mb-4",
    "rounded-standard",
    "bg-amber-50"
  );
  
  // Data för korten för att undvika kodupprepning
  const employees = [
    {
    src: hourly.data?.url,
    title: "Timmens Arbetare är ",
    desc: "Specialist på 'Deep Clean'. Råkade tvätta tre kunders mobiltelefoner i tron att de var musslor, men handdukarna har aldrig varit renare.",
  },
  {
    src: daily.data?.url,
    title: "Dagens Arbetare är ",
    desc: "Ansvarig för gurkmasker. Har tyvärr ätit upp alla gurkskivor som skulle ligga på dina ögon, men erbjuder utmärkt 'knådnings-massage' med små klor.",
  },
  {
    src: weekly.data?.url,
    title: "Veckans Arbetare är ",
    desc: "Head of Lerbad. Hävdar bestämt att leran från diket bakom pizzerian har bäst mineraler. Tar betalt i glittrande föremål.",
  },
];

// 2. Loopa igenom datan och skapa kort
employees.forEach((emp) => {
  const card = document.createElement("article");
  card.classList.add(
    "bg-amber-100",
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
  
  // Slumpmässig anställd från Lists.ts
  const staffNames = staffList.map((staffName) => staffName.name);
  const randomIndex = Math.floor(Math.random() * staffNames.length);
  const chosenEmployee = staffNames[randomIndex];
  emp.title = emp.title + chosenEmployee;

  const img = document.createElement("img");
  img.src = String(emp.src);
  img.alt = `Bild på ${chosenEmployee}`;
  img.classList.add("w-32", "h-32", "rounded-full", "object-cover", "mb-3", "bg-dark-orange", "p-2", "hover:bg-light-blue");
  
  const title = document.createElement("h3");
  title.textContent = emp.title;
  title.classList.add("font-semibold", "text-lg", "mb-1", "text-slate-800");
  
  const text = document.createElement("p");
  text.textContent = emp.desc;
  text.classList.add("text-sm", "text-black");
  
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
