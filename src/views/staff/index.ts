import { createEmployeeOfXSection } from "../../components/EmployeeOfX";
import Card from "../../components/staffcards";
import { staffList } from "../../Lists";

export default function staffView() {
  const staffPage = document.createElement("main");
  staffPage.classList.add(
    "flex",
    "items-center",
    "flex-col",
    "bg-light-blue",
    "rounded-standard",
    "drop-shadow-standard",
    "self-center",
    "w-[90vw]",
    "max-w-[1200px]",
    "h-[70vh]",
    "overflow-y-auto",
    "overflow-x-hidden",
    "scrollbar",
    "p-standard"
  );
  staffPage.innerHTML = `
  <h1 class="font-one text-center">Vår Personal</h1>
  `;
  
  const container = document.createElement("div");
  container.classList.add(
    "grid", 
    "grid-cols-1", 
    "md:grid-cols-2", 
    "lg:grid-cols-4", 
    "gap-6", 
    "p-6"
  );
  
  const sortedStaffList = [...staffList].sort((a, b) => a.name.localeCompare(b.name));
  
  sortedStaffList.forEach((staff) => {
    const treatments = staff.treatmentTypes;
    const availability = staff.availability;
    
    const card = Card({
      name: staff.name,
      treatments: treatments,
      availability: availability,
      imageLink: staff.imageLink,
      information: staff.information
    });
    
    container.appendChild(card);
  });
  
  const ctaSection = document.createElement("div");
  ctaSection.classList.add(
    "flex",
    "items-center",
    "justify-center"
  );
  
  const availabilityText = document.createElement("p");
  availabilityText.classList.add("font-one", "text-3xl");
  availabilityText.textContent = "Se lediga tider:";
  
  const ctaButton = document.createElement("button");
  ctaButton.textContent = "Klicka här";
  ctaButton.classList.add("frontCTA", "m-1", "mt-2", "text-xl");
  ctaButton.addEventListener("click", () => {
    location.href = "book";
  });
  
  ctaSection.appendChild(availabilityText);
  ctaSection.appendChild(ctaButton);
  
  // 1. Skapa elementet genom att anropa funktionen
  const awardSection = createEmployeeOfXSection();
  awardSection.classList.add("p-6");
  const awardTitle = document.createElement("h1");
  awardTitle.classList.add("font-one", "text-center", "mb-3", "text-4xl")
  awardTitle.textContent = "Utmärkelser";
  // 2. Lägg till det i DOM-trädet (t.ex. sist i home-containern)
  
  staffPage.append(container, awardTitle, awardSection, ctaSection);
  return staffPage;
}