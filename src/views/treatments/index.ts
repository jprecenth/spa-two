import { treatmentTypes } from "../../Lists.js";
import { treatmentList } from "../../Lists.js";
import AccordionItem from "../../components/treatmentAccordion.js";

export default function treatments() {
  const treatments = document.createElement("main");
  treatments.classList.add(
    "home",
    "overflow-y-auto",
    "overflow-x-hidden",
    "bg-light-blue",
    "p-standard",
    "rounded-standard",
    "drop-shadow-standard",

    "w-full",
    "max-w-[1200px]",
    "scrollbar",
    "mx-auto",

    "flex",
    "flex-col",
    "items-center",
    "justify-start"
  );
  treatments.innerHTML = `
    <h1 class='font-one text-center pb-1'>Behandlingar</h1>
     <br>
    <p>Utforska vårt utbud av behandlingar här på <span class="font-one font-extrabold uppercase">Washbear Spa</span>.</p>
  `;
  let CTAcontainer = document.createElement("div");
  CTAcontainer.innerHTML = `<button onClick="location.href='book'" class="frontCTA m-standard text-xl">Boka nu!</button>`;
  treatments.append(CTAcontainer);

  const accordion = document.createElement("article");
  accordion.classList.add("accordion", 'bg-blue-100', 'rounded-md', 'm-2', 'w-full');
  treatments.append(accordion);

  treatmentTypes.forEach((type) => {
    const filtered = treatmentList.filter((treatment) => {
      const types = Array.isArray(treatment.type)
      ? treatment.type
      : [treatment.type];
      return types.includes(type);
    });

    if (filtered.length > 0) {
      const accordionItem = AccordionItem({ title: type, items: filtered });
      accordion.append(accordionItem);
    }
  });


 
  return treatments;
}
