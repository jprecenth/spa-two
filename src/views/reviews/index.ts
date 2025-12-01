import { reviews } from "../../Lists.ts";
import Card, { type cardProps } from "../../components/reviewcard";

let draftText = "";
let saveDraft = false;

export default function testimonials() {
  const testimonials = document.createElement("main");
  testimonials.classList.add(
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
  
  // SPARADE OMDÖMEN //
  // ☆ Hämtar reviews från localStorage
  const savedReviews = JSON.parse(localStorage.getItem("userReviews") || "[]"); //hämta key värdet för userReviews eller en tom sträng
  savedReviews.forEach((review: cardProps) => {
    const card = Card(review);
    card.classList.add("user-review-card");
    reviewContainer.append(card) //lägger till sparade reviews högst upp i reviewContainern 
  });
  
  // SKAPA REVIEW-CARDS //
  // ☆ Skapa kort för omdömen i reviews-arrayen, men bara 9 stycken
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
  
  inputContainer.append(addReviewButton, clearStateButton);
  testimonials.append(inputContainer);
  
  // MODAL-ELEMENT //
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
  
  // Inputfält till formuläret:
  const inputField = document.createElement("textarea");
  inputField.name = "Omdöme";
  // ☆ "required" gör fältet obligatoriskt för att skicka in formuläret
  inputField.required = true;
  // ☆ "maxLength" sätter character limits för att begränsa mängden text
  inputField.maxLength = 150;
  inputField.classList.add("w-full", "border", "p-2", "h-[120px]", "resize-none", "overflow-y-auto");
  // ☆ setAttribute placeholder ger en text i fältet innan input 
  inputField.setAttribute("placeholder","Berätta om din spa-upplevelse!")
  // ☆ "setCustomValidity" ger en anpassad varning utanför fältet
  inputField.setCustomValidity("Du måste skriva något för att lägga till ett omdöme.");
  // ☆ Wanted behavior: ingen input > ge varning; faktisk input > ingen varning, 
  // eventlistener nollställer customvalidity varning efter något har skrivits
  inputField.addEventListener("input", () => {
    if (inputField.value.trim() !== "") {
      inputField.setCustomValidity("");
    }
  });
  
  // ☆ Samma som inputField-elementet ovan
  const inputName = document.createElement("textarea");
  inputName.classList.add("border", "p-2", "h-[42px]", "resize-none");
  inputName.setAttribute("placeholder","Skriv ditt namn");
  inputName.required = true;
  inputName.id = "Namn";
  inputName.name = "Namn";
  inputName.maxLength = 20;
  inputName.setCustomValidity("Du måste skriva ett namn för att lägga till ett omdöme.");
  inputName.addEventListener("input", () => {
    if (inputName.value.trim() !== "") {
      inputName.setCustomValidity("");
    }
  });
  
  const nameLabel = document.createElement("label");
  nameLabel.classList.add("font-medium");
  nameLabel.textContent = "Namn:"; 
  // ☆ htmlFor parar ihop nameLabel med inputName vars name är "Namn"
  nameLabel.htmlFor = "Namn";
  
  const nameContainer = document.createElement("div");
  nameContainer.classList.add("flex", "flex-col");
  nameContainer.append(nameLabel, inputName);
  
  // UTKAST-CONTAINERN //
  const draftBox = document.createElement("input");
  draftBox.type = "checkbox";
  // draftBox.checked = saveDraft;
  
  const draftLabel = document.createElement("label");
  draftLabel.innerHTML = "Spara utkast:&nbsp;";
  draftLabel.classList.add("text-sm");
  
  draftLabel.append(draftBox)
  
  const form = document.createElement("form");
  
  // ☆ När checkboxen för utkast inte är icheckad, rensa draftText
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
  
  // KNAPP-CONTAINERN //
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
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
  
  // ☆STAR STUFF☆ //
  let selectedRating: number = 0;
  let times = 0;
  // ☆ skapa 5 stjärnor
  while (times < 5) {
    let starEl = document.createElement("span");
    starEl.classList.add("starEl", "starIcon", "text-2xl",  "text-orange-300", "text-shadow-sm/40", "mr-2", "hover:cursor-pointer", "w-[20px]", "text-center");
    starEl.textContent = "☆";
    // ☆ Få rätt siffra för stjärnan, +1 för att index börjar på 0
    const index = times + 1;
    // ☆ Gör att stjärnans tooltip visar dess index också
    starEl.setAttribute("title", `Betygsätt ${index}`);
    
    let selected = false;
    
    starEl.addEventListener("click", () => {
      selected = !selected;
      // ☆ Om en stjärna är vald:
      if (selected) {
        // ☆ Ändra texten till dess index-nummer
        starEl.textContent = `${index}`;
        // ☆ Lägg till större skugga, ta bort den mindre skuggan
        starEl.classList.remove("text-shadow-sm/40");
        starEl.classList.add("text-shadow-sm/80");
        // ☆ Index är valt betyg
        selectedRating = index;
      }
      // ☆ Om en stjärna inte är vald
      else {
        // ☆ Ändra texten till stjärna
        starEl.textContent = "☆";
        starEl.classList.add("text-shadow-sm/40");
        starEl.classList.remove("text-shadow-sm/80");
        // ☆ Låt betyg vara noll
        selectedRating = 0;
      };
    });
    
    // ☆ När musen är över en stjärna:
    starEl.addEventListener("mouseenter", () => {
      // ☆ Om stjärnan inte är vald/klickad på:
      if (!selected) {
        // ☆ Visa index-nummer
        starEl.textContent = `${index}`;
      }
    });
    
    // ☆ När musen lämnar en stjärna:
    starEl.addEventListener("mouseleave", () => {
      // ☆ Om stärnan inte är vald/klickad på:
      if (!selected) {
        // ☆ Visa stjärna igen
        starEl.textContent = "☆";
      }
    });
    
    // ☆ Lägg till stärnor och dess label i ratingContainer
    ratingContainer.append(starLabel, iconContainer);
    
    // ☆ Vid klick på Avbryt-knappen:
    cancelButton.addEventListener("click", () => {
      // ☆ Avmarkera och återställ till stjärnor
      selected = false;
      starEl.textContent = "☆";
      starEl.classList.remove("text-shadow-sm/80");
      starEl.classList.add("text-shadow-sm/40");
    })
    
    // ☆ Lägg till stjärnan i iconContainer
    iconContainer.append(starEl);
    // ☆ Öka times med en, tills times är 5
    times++
  }
  
  modalContent.append(modalTitle, form);
  modal.append(modalContent);
  testimonials.append(modal);
  
  // ☆ När något skrivs i inputField:
  inputField.addEventListener("input", () => {
    // ☆ Om utkast-checkboxen är icheckad:
    if (draftBox.checked) {
      // ☆ Gör draftText till texten som skrivits
      draftText = inputField.value;
    }
  });
  
  // ☆ Lägg till alla containers i formuläret
  form.append(inputField, draftContainer, ratingContainer, nameContainer, buttonContainer);
  
  // LÄGG TILL OMDÖME-KNAPPEN //
  addReviewButton.addEventListener("click", () => {
    const savedDraft = localStorage.getItem("reviewDraft");
    if (saveDraft && savedDraft) {
      const draft = JSON.parse(savedDraft);
      inputField.value = draft.text || "";
      inputName.value = draft.name || "";
    } else {
      // ☆ Nollställ input om inget utkast ska användas
      inputField.value = "";
      inputName.value = "";
    }
    modal.classList.remove("hidden");
    modal.classList.add("bg-black/25", "w-full", "h-screen", "fixed", "top-0", "left-0")
  });
  
  // FORM EVENT LISTENER //
  // ☆ Eventlistener för inskickat formulär
  form.addEventListener("submit", (e) => {
    // ☆ Stoppa sidan från att ladda om och rensa localStorage
    e.preventDefault();
    console.log("submit");
    
    // ☆ Formulär-kontroll: kollar om alla obligatoriska fält är ifyllda eller ej
    if (!form.checkValidity()) {
      // ☆ Om obligatoriska fält inte är ifyllda, visa customValidity-varning för fälten
      form.reportValidity();
      return;
    }
    const name = inputName.value;
    const text = inputField.value;
    const rating = selectedRating;

    const saveReview = JSON.parse(localStorage.getItem("userReviews") || "[]"); //måste först läsa in datan från userReviews för att inte skriva över arrayen
    const newReview = {name, text, rating};
    saveReview.unshift(newReview); // lägger till nya reviews först i arrayen
    localStorage.setItem("userReviews", JSON.stringify(saveReview));
    
    // ☆ Skapa ett nytt kort vid inskickat formulär
    const newCard = Card({ name, text, rating: selectedRating});
    newCard.classList.add("user-review-card");
    // ☆ Lägg till kortet först i listan av omdömen
    reviewContainer.prepend(newCard);
    // ☆ Avmarkera checkboxen för utkast efter
    draftBox.checked = false;
    // ☆ Ta bort utkastet från localStorage
    localStorage.removeItem("reviewDraft")
    // ☆ Göm modalen igen
    modal.classList.add("hidden");
  });
  
  // CANCEL BUTTON //
  cancelButton.addEventListener("click", () => {
    // ☆ Om utkast-rutan är icheckad:
    if (draftBox.checked) {
      // ☆ Ta inputen från omdöme- och namnfälten 
      const draft = {
        text: inputField.value,
        name: inputName.value
      };
      // ☆ Spara utkastet i localStorage
      localStorage.setItem("reviewDraft", JSON.stringify(draft));
    } 
    // ☆ Om utkast-rutan inte är icheckad:
    else {
      // ☆ Ta bort utkastet från localStorage
      localStorage.removeItem("reviewDraft");
    }
    modal.classList.add("hidden");
  });
  
  // RENSA STATE-KNAPPEN //
  clearStateButton.addEventListener("click", () => {
    // ☆ Ta bort utkastet och nya reviews från localStorage
    localStorage.removeItem("reviewDraft")
    localStorage.removeItem("userReviews")

    document.querySelectorAll(".user-review-card").forEach(el => el.remove());
    // ☆ Avmarkera utkast-checkboxen
    draftBox.checked = false;
    saveDraft = false;
  });
  
  testimonials.append(inputContainer, reviewContainer);
  
  return testimonials;
}

//#region THE END!