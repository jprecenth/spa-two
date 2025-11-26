import { reviews } from "../../Lists.ts";
import Card from "../../components/reviewcard";

let draftText = "";
let saveDraft = false;

interface UserReview {
name: string;
text: string;
rating: 1 | 2 | 3 | 4 | 5;
}

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
  );
  
   // hämtar reviews från användaren i local storage
   const savedReviews = JSON.parse(localStorage.getItem("userReviews") || "[]"); 
    savedReviews.forEach((review: UserReview) => {
      const card = Card(review);
      card.classList.add("user-review-card");
    });
  
  // laddar reviews från Lists.ts
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
  
  // dold modal/ruta
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
    "rounded",
    "shadow-lg",
    "w-[400px]",
    "mt-30"
  );
  
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Skriv din recension";
  
  const inputField = document.createElement("textarea");
  inputField.classList.add("w-full", "border", "p-2", "mt-2");
  
  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.classList.add("border", "p-2", "mt-2", "h-[40px]", "resize-none");
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Namn"; 
  
  const nameContainer = document.createElement("div");
  nameContainer.append(nameLabel, inputName);
  nameContainer.classList.add("flex", "flex-col");
  
  const draftBox = document.createElement("input");
  draftBox.type = "checkbox";
  draftBox.checked = true;
  saveDraft = true;

  draftBox.addEventListener("change", () => {
    saveDraft = draftBox.checked;
    
    if (!saveDraft) {
      draftText = "";
    }
  })
  
  const draftLabel = document.createElement("label");
  draftLabel.textContent = "Spara utkast:";
  
  inputField.value = draftText;
  
  const draftContainer = document.createElement("div");
  draftContainer.classList.add("flex", "flex-row", "justify-end");
  draftContainer.append(draftLabel, draftBox);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Skicka";
  submitButton.classList.add(
    "bg-green-200",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4"
  );
  
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Avbryt";
  cancelButton.classList.add(
    "bg-amber-100",
    "text-black",
    "px-4",
    "py-2",
    "rounded",
    "mt-4"
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "flex-row", "justify-center");
  buttonContainer.append(submitButton, cancelButton);
  
  modalContent.append(modalTitle, inputField, nameContainer, draftContainer, buttonContainer);
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

    const name = inputName.value;
    const text = inputField.value;

    const newCard = Card({ name, text, rating: 5 });
    newCard.classList.add("user-review-card");
    reviewContainer.prepend(newCard);

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
  
  //Clearing the state of draft and new reviews
  clearStateButton.addEventListener("click", () => {

    localStorage.removeItem("reviewDraft")
    document.querySelectorAll(".user-review-card").forEach(el => el.remove());
  });
  
  testimonials.append(inputContainer, reviewContainer);
  
  return testimonials;
}



