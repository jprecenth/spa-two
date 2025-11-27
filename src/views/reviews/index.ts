import { reviews } from "../../Lists.ts";
import Card from "../../components/reviewcard";
import createButton from "../../components/button.ts"

let draftText = "";
let saveDraft = false;

interface UserReview {
  name: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export default function testimonials() {
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
  
  // hämtar reviews från användaren i local storage
  const savedReviews = JSON.parse(localStorage.getItem("userReviews") || "[]"); 
  savedReviews.forEach((review: UserReview) => {
    const card = Card(review);
    card.classList.add("user-review-card");
  });
  
  let cardAmount = 0;
  reviews.forEach((review) => {
    
    if (cardAmount < 9) {
      const card = Card(review);
      reviewContainer.append(card);
      cardAmount++;
    }
  });
  
  // INPUT-CONTAINER //
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
   //SÅ LÄGGER DU TILL KNAPPEN

  //DETTA SKAPAR KNAPPEN
  inputContainer.append(addReviewButton, clearStateButton);
  testimonials.append(inputContainer);
  const testButton = createButton({
    label: "test",
    variant: "cancel",
    className: "px-4",
    onClick: () => {
      
    }
  });
  //DETTA RENDERAR KNAPPEN, aka säger vart den ska vara
  testimonials.append(testButton);


  // MODAL //
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
  
  const inputField = document.createElement("input");
  inputField.type  = "text";
  inputField.name = "Omdöme";
  inputField.id = "Omdöme";
  inputField.required = true;
  inputField.classList.add("w-full", "border", "p-2", "h-[120px]");
  inputField.setAttribute("placeholder","Berätta om din spa-upplevelse!")
  inputField.setCustomValidity("Du måste skriva något för att lägga till ett omdöme.");
  inputField.addEventListener("input", () => {
    inputField.setCustomValidity("");
  })
  
  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.classList.add("border", "p-2", "h-[40px]", "resize-none");
  inputName.setAttribute("placeholder","Skriv ditt namn");
  inputName.required = true;
  inputName.id = "Namn";
  inputName.name = "Namn";
  inputName.setCustomValidity("Du måste skriva ett namn för att lägga till ett omdöme.");
  inputName.addEventListener("input", () => {
    inputName.setCustomValidity("");
  })
  
  const nameLabel = document.createElement("label");
  nameLabel.classList.add("font-medium");
  nameLabel.textContent = "Namn:"; 
  nameLabel.htmlFor = "Namn";
  
  const nameContainer = document.createElement("div");
  nameContainer.append(nameLabel, inputName);
  nameContainer.classList.add("flex", "flex-col");
  
  // SPARA UTKAST-CONTAINERN //
  const draftBox = document.createElement("input");
  draftBox.type = "checkbox";
  draftBox.checked = saveDraft;
  
  const draftLabel = document.createElement("label");
  draftLabel.innerHTML = "Spara utkast:&nbsp;";
  draftLabel.classList.add("text-sm");
  
  draftLabel.append(draftBox)
  
  const form = document.createElement("form");
  
  draftBox.addEventListener("change", () => {
    saveDraft = draftBox.checked;
    
    if (!saveDraft) {
      draftText = "";
    }
  })
  
  inputField.value = draftText;
  const draftContainer = document.createElement("div");
  draftContainer.classList.add("flex", "flex-row", "justify-end");
  draftContainer.append(draftLabel)
  
  // BETYGSÄTTNINGS-CONTAINERN //
  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("mb-2");
  const starLabel = document.createElement("label");
  starLabel.textContent = "Betygsätt ditt besök:"; 
  starLabel.classList.add("font-medium");
  
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("flex", "align-center", "justify-center", "iconContainer");
  let times = 0;
  
  // KNAPP-CONTAINERN //
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Skicka in";
  submitButton.classList.add(
    "bg-light-green",
    "hover:bg-green-200",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4",
    "button"
  );
  cancelButton.textContent = "Avbryt";
  cancelButton.classList.add(
    "bg-light-orange",
    "hover:bg-orange-200",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4"
  );
  
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "flex-row", "justify-center");
  buttonContainer.append(submitButton, cancelButton);

  let selectedRating: number = 0;
  // ☆STAR STUFF☆ //
  while (times < 5) {
    let starEl = document.createElement("span");
    starEl.classList.add("starEl", "starIcon", "text-2xl",  "text-orange-300", "text-shadow-sm/40", "mr-2", "hover:cursor-pointer", "w-[20px]", "text-center");
    starEl.textContent = "☆";
    const index = times + 1;
    starEl.setAttribute("title", `Betygsätt ${index}`);
    
    let selected = false;
    
    // #region Event listeners
    
    starEl.addEventListener("click", () => {
      selected = !selected;
      if (selected) {
        starEl.textContent = `${index}`;
        starEl.classList.remove("text-shadow-sm/40");
        starEl.classList.add("text-shadow-sm/80");
        selectedRating = index;
      }
      else {
        starEl.textContent = "☆";
        starEl.classList.add("text-shadow-sm/40");
        starEl.classList.remove("text-shadow-sm/80");
        selectedRating = 0;
      };
    });
    
    starEl.addEventListener("mouseenter", () => {
      if (!selected) {
        starEl.textContent = `${index}`;
      }
    });
    
    starEl.addEventListener("mouseleave", () => {
      if (!selected) {
        starEl.textContent = "☆";
      }
    });
    
    ratingContainer.append(starLabel, iconContainer);
    
    cancelButton.addEventListener("click", () => {
      selected = false;
      starEl.textContent = "☆";
    })
    
    iconContainer.append(starEl);
    times++
  }
  
  modalContent.append(modalTitle, form);
  modal.append(modalContent);
  testimonials.append(modal);
  
  inputField.addEventListener("input", () => {
    if (draftBox.checked) {
      draftText = inputField.value;
    }
  });
  form.append(inputField, draftContainer, ratingContainer, nameContainer, buttonContainer);
  
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
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const name = inputName.value;
    const text = inputField.value;

    const newCard = Card({ name, text, rating: selectedRating || 0 });
    newCard.classList.add("user-review-card");
    reviewContainer.prepend(newCard);
    draftBox.checked = false;
    
    localStorage.removeItem("reviewDraft")
    
    modal.classList.add("hidden"); //modalen försvinner
  });
  
  //Cancel button
  cancelButton.addEventListener("click", () => {
    
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
  
  //Clear the state of draft
  clearStateButton.addEventListener("click", () => {
    localStorage.removeItem("reviewDraft")
    document.querySelectorAll(".user-review-card").forEach(el => el.remove());
    draftBox.checked = false;
    saveDraft = false;
  });
  
  testimonials.append(inputContainer, reviewContainer);
  
  
  return testimonials;
}

//#endregion

//#region THE END!