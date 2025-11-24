import { reviews } from "../../Lists.ts";
import { makeIcon } from "../../components/icon.ts";
import Card from "../../components/reviewcard";

let draftText = "";
let saveDraft = false;


export default function testimonials() {
  //getDaily().then((data) => console.log(data))
  const testimonials = document.createElement("main");
  testimonials.classList.add("Recenssioner", "flex", "items-center", "flex-col", "bg-light-blue", "p-standard", "rounded-standard", "drop-shadow-standard", "self-center", "w-[90vw]", "max-w-[1200px]", "h-[70vh]", "overflow-y-auto", "overflow-x-hidden", "scrollbar");
  testimonials.innerHTML = `
    <h1 class="font-one">Recensioner</h1>
    <h2>Vi vill alltid att du ska gå ut med ett leende!</h2>
    <p>
        Kolla hur nöjda våra kunder är!
    </p>

  `;

  const reviewContainer = document.createElement("div");
  reviewContainer.classList.add(
    "grid",
    "grid-cols-1",
    "gap-4",
    "sm:grid-cols-2",
    "lg:grid-cols-3",
    "mb-4"
  );


  let cardAmount = 0;
  reviews.forEach((review) => {

    if (cardAmount < 9) {
      const card = Card(review);
      reviewContainer.append(card);
      cardAmount++;
    }
  });



  // Bottom Section Here <3 //
  const inputContainer = document.createElement("div");
  inputContainer.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "mb-4"
  );

  inputContainer.classList.add("flex", "gap-4", "mt-4");

  const addReviewButton = document.createElement("button");
  addReviewButton.textContent = "Lägg till omdöme";

  const clearStateButton = document.createElement("button");
  clearStateButton.textContent = "Rensa state";

  inputContainer.append(addReviewButton, clearStateButton);
  testimonials.append(inputContainer);

  ////////////////////////////////////////////  Skapa en dold modal/ruta
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "flex",
    "items-start",
    "justify-center",
    "hidden"
  );

  const modalContent = document.createElement("div");
  modalContent.classList.add(
    "bg-white",
    "p-6",
    "radius-standard",
    "shadow-lg",
    "w-[400px]",
    "mt-20"
  );
  
  const modalTitle = document.createElement("h1");
  modalTitle.textContent = "Skriv en recension";
  modalTitle.classList.add("font-one", "text-3xl", "text-center", "mb-5");
  
  const inputField = document.createElement("textarea");
  inputField.classList.add("w-full", "border", "p-2", "h-[120px]");
  inputField.setAttribute("placeholder","Berätta om din spa-upplevelse!")
  
  const draftLabel = document.createElement("label");
  draftLabel.innerHTML = "Spara utkast:&nbsp;";
  draftLabel.classList.add("text-sm")
  
  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.classList.add("border", "p-2", "h-[40px]", "resize-none");
  inputName.setAttribute("placeholder","Skriv ditt namn");
  const nameLabel = document.createElement("label");
  nameLabel.classList.add("font-medium");
  nameLabel.textContent = "Namn:"; 
  
  const nameContainer = document.createElement("div");
  nameContainer.append(nameLabel, inputName);
  nameContainer.classList.add("flex", "flex-col");

  const draftBox = document.createElement("input");
  draftBox.type = "checkbox";
  draftBox.checked = saveDraft;
  
  draftBox.addEventListener("change", () => {
    saveDraft = draftBox.checked;

    if (!saveDraft) {
      draftText = "";
    }
  })
  
  inputField.value = draftText;

  const draftContainer = document.createElement("div");
  draftContainer.classList.add("flex", "flex-row", "justify-end");
  draftContainer.append(draftLabel, draftBox);
  
  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("mb-2");
  const starLabel = document.createElement("label");
  starLabel.textContent = "Betygsätt ditt besök:"; 
  starLabel.classList.add("font-medium");
  
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("flex", "align-center", "justify-center", "iconContainer");
  let times = 0;
  
  while (times < 5) {
    let starEl = document.createElement("span");
    starEl.classList.add("starEl", "starIcon", "text-2xl",  "text-orange-300", "text-shadow-sm/40", "mr-2", "hover:cursor-pointer", "w-[20px]", "text-center");
    starEl.textContent = "☆";
    const index = times + 1;
    starEl.setAttribute("title", `Betygsätt ${index}`);
    
    starEl.addEventListener("mouseenter", () => {
      starEl.textContent = `${index}`;
    });
    starEl.addEventListener("mouseleave", () => {
      starEl.textContent = "☆";
    });
    iconContainer.append(starEl);
    times++
  }

  
  ratingContainer.append(starLabel, iconContainer);
  const submitButton = document.createElement("button");
  submitButton.textContent = "Skicka in";
  submitButton.classList.add(
    "bg-light-green",
    "hover:bg-light-white",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4"
  );

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Avbryt";
  cancelButton.classList.add(
    "bg-light-orange",
    "hover:bg-dark-orange",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4"
  );
  
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "flex-row", "justify-center");
  buttonContainer.append(submitButton, cancelButton);
  
  modalContent.append(modalTitle, inputField, draftContainer, ratingContainer, nameContainer, buttonContainer);
  modal.append(modalContent);
  testimonials.append(modal);

  inputField.addEventListener("input", () => {
    if (draftBox.checked) {
      draftText = inputField.value;
    }
  });

  // Event listeners
  addReviewButton.addEventListener("click", () => {
    
    const savedDraft = localStorage.getItem("reviewDraft");
    if (saveDraft && savedDraft) {
      const draft = JSON.parse(savedDraft);
      inputField.value = draft.text || "";
      inputName.value = draft.name || "";
    } else {
      // Nollställ input om inget utkast ska användas
      inputField.value = "";
      inputName.value = "";
    }
    modal.classList.remove("hidden");
    modal.classList.add("bg-black/25", "w-full", "h-screen", "fixed", "top-0", "left-0")
  });
  
  submitButton.addEventListener("click", () => {
    if (draftBox.checked) {
      const draft = {
        text: inputField.value,
        name: inputName.value
      };
      localStorage.setItem("reviewDraft", JSON.stringify(draft));
    } else {
      localStorage.removeItem("reviewDraft");
    }
    
    modal.classList.add("hidden");
  });

  //Cancel button
  cancelButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  //Clear the state of draft
  clearStateButton.addEventListener("click", () => {
    localStorage.removeItem("reviewDraft")
  });

  testimonials.append(inputContainer, reviewContainer);

  return testimonials;
}
