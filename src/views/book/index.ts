import { treatmentList, treatmentTypes, sortOptions } from "../../Lists";
import { renderConfirmedPopup, showPopup} from "../../components/confirmPopUp";
import BookingCalendar from "../../components/BookingCalendar";
import createButton from "../../components/button";

type BookingSelection = {
    date: string | null;
    specialistName: string | null;
};

export default function generatebook() {
    // CREATING ALL CONTAINERS //
    const book = document.createElement("div");
    book.classList.add(
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
    book.innerHTML = `<h1 class="font-one text-center pb-1">Välj och boka behandling</h1>`; 
    
    const bookingContainer = document.createElement("div");
    bookingContainer.classList.add("bookingContainer", "flex", "flex-row", "[&>*]:p-2","w-[80vw]","max-w-[1180px]", "justify-center", "mt-[10px]", "pb-[20px]");
    
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendarContainer");
    const calendar = BookingCalendar();
    calendarContainer.append(calendar);
    
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filterContainer", "min-w-full", "flex", "flex-col", "inline-flex", "justify-center", "text-[12px]");
    
    const selectionContainer = document.createElement("div");
    selectionContainer.classList.add("selectionContainer", "grow", "min-w-2/3")
    
    const lowerContainer = document.createElement("div");
    lowerContainer.classList.add("lowerContainer", "flex", "justify-between", "mr-4", "min-h-[307px]");
    
    selectionContainer.append(filterContainer, lowerContainer);
    bookingContainer.append(calendarContainer, selectionContainer);
    
    const filterTop = document.createElement("div");
    filterTop.classList.add("filter-top", "grid", "bg-blue-100", "rounded-md", "p-[3px]", "grid-cols-4", "[&>*]:shadow-sm/20", "items-center");
    const filterBtm = document.createElement("div");
    filterBtm.classList.add("filter-btm-left","[&>*]:shadow-sm/20", "rounded-md", "p-1", "justify-end", "flex");
    const dropDown = document.createElement("select");
    dropDown.classList.add("dropDown", "button", "text-[12px]");
    
    // SORTING & FILTERING //
    for (const option of sortOptions) {
        // ☆ Skapa ett alternativ i dropdown-menyn för varje element i listan
        const optionElement = document.createElement("option");
        // ☆ Gör alternativets text samma som i listan
        optionElement.textContent = option;
        dropDown.append(optionElement);
    }
    
    const sortBtn = document.createElement("button");
    sortBtn.textContent = "Sortera";
    sortBtn.classList.add("text-[12px]"); // "sortBtn", "max-h-fit",
    
    filterBtm.append(dropDown, sortBtn);
    filterContainer.append(filterTop, filterBtm);
    
    const boxArray: HTMLButtonElement[] = [];
    for (const type of treatmentTypes) {
        // ☆ För varje typ av behandling, skapa en knapp i filtreringen
        const typeDiv = document.createElement("button");
        typeDiv.classList.add("typeDiv", "flex", "basis-1/4", "text-center", "py-[3px]", "text-[12px]", "h-[26px]", "items-center", "justify-center", "min-w-[fit-content]");
        // ☆ Låt knappens namn vara samma som i listan
        typeDiv.textContent = type;
        filterTop.append(typeDiv);
        // ☆ Lägg till knappen i boxArray
        boxArray.push(typeDiv);
    }
    
    for (let box of boxArray) {
        // ☆ För varje knapp i arrayen:
        box.addEventListener("click", function() {
            // ☆ Vid klick, återställ bakgrundsfärgen
            for (let box of boxArray) {
                box.style.backgroundColor = "";
            };
            
            const selectedType = box.textContent;
            // ☆ Filtrera i behandlingarna efter den typen som klickats
            filterTreatments(selectedType);
            // ☆ Ändra bakgrundsfärg när en typ är markerad
            box.style.backgroundColor = "var(--color-dark-white)";
        });
    };

    // ☆ sortedList är treatmentList
    let sortedList = [...treatmentList];
    // ☆ Sortera alfabetiskt namnen a till ö
    function aToO() {
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        checkoutList();
    }
    // ☆ Sortera alfabetiskt namnen ö till a
    function oToA() {
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        checkoutList();
    }
    // ☆ Sortera kostnaden högt till lågt
    function highToLow() {
        sortedList.sort((a : any, b : any) => b.cost-a.cost);
        checkoutList();
    }
    // ☆ Sortera kostnaden lågt till högt
    function lowToHigh() {
        sortedList.sort((a : any, b: any) => (a.cost-b.cost));
        checkoutList();
    }
    // ☆ Implementera switch case för klick på sortera-knappen
    sortBtn.addEventListener("click", function() {
        const selectedSort = dropDown.value;
        switch(selectedSort) {
            case "Alfabetiskt, A → Ö":
            aToO();
            break;
            case "Alfabetiskt, Ö → A":
            oToA();
            break;
            case "Pris, högt → lågt":
            highToLow();
            break;
            case "Pris, lågt → högt":
            lowToHigh();
            break;
        }
    })
    
    book.append(bookingContainer);  
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("clearBtn", "flex", "basis-1/4", "text-center", "py-2", "shadow-sm/20", "uppercase", "underline", "text-[12px]", "h-[26px]", "items-center", "justify-center", "min-w-[fit-content]");
    clearBtn.textContent = "Rensa filter";
    filterTop.append(clearBtn);
    
    // ☆ Filtrera behandlingar
    function filterTreatments(selectedType: string) {
        // ☆ Hitta alla behandlings-alternativ
        const allBoxes = book.querySelectorAll<HTMLDivElement>(".treatmentBox");
        // ☆ För varje alternativ;
        allBoxes.forEach((box) => {
            // ☆ Om behandlingen ingår i flera typer, dela dem 
            const types = box.dataset.type?.split(",");
            // ☆ Om behandlingens typ är den som valts, gör display till flex & visa den
            if (types?.includes(selectedType)) {
                box.style.display = "flex";
            }
            // ☆ Annars ha display none, som gömmer behandlingen
            else {
                box.style.display = "none";
            }
        })
    }

    // ☆ Vid klick på rensa-knappen:
    clearBtn.addEventListener("click", function() {
        // ☆ Hitta alla behandlingar
        const allBoxes = document.querySelectorAll<HTMLDivElement>(".treatmentBox");
        // ☆ För varje behandling, lägg till flex som gör att de visas
        allBoxes.forEach(box => {
            box.style.display = "flex";
        })
        // ☆ Och återställ bakgrundsfärgen så ingen filtreringsknapp längre är markerad
        for (let box of boxArray) {
            box.style.backgroundColor = "";
        }
    })
    
    // BOKNINGSVAL //
    const treatmentContainer = document.createElement("div");
    treatmentContainer.classList.add("treatmentContainer", "min-w-4/6", "flex", "flex-col");
    
    const summaryContainer = document.createElement("div");
    summaryContainer.classList.add("summaryContainer", "flex", "flex-col", "justify-end", "ml-4", "min-w-1/4");
    lowerContainer.append(treatmentContainer, summaryContainer);
    
    const totalContainer = document.createElement("div");
    const selectedTreatmentContainer = document.createElement("div");
    const selectedTreatmentHeader = document.createElement("p");
    selectedTreatmentHeader.innerHTML = `<b>Vald behandling:</b>`;
    const selectedUl = document.createElement("ul"); 
    selectedTreatmentContainer.prepend(selectedTreatmentHeader, selectedUl);
    const selectedDateContainer = document.createElement("div");
    selectedDateContainer.classList.add("mb-2", "text-sm", "selectedDateContainer", "mb-[20px]");

    const selDateEl = document.createElement("p");
    const selStaffEl = document.createElement("p");
    const hr = document.createElement("hr");
    selectedDateContainer.prepend(hr, selDateEl, selStaffEl);
    
    let currentSelection: BookingSelection = {
        date: null,
        specialistName: null,
    }
    
    function renderSelection({date, specialistName}: BookingSelection){
        currentSelection.date = date;
        currentSelection.specialistName = specialistName;
        
        selDateEl.innerHTML =`<span class="text-base font-bold">Datum:</span> ${date || ""}`;
        selStaffEl.innerHTML = `<span class="text-base font-bold">Specialist:</span> ${specialistName || ""}`;
    }
    
    // ☆ Lyssnar om något sker i kalender-komponenten
    calendar.addEventListener("booking:change", (e: Event) => {
        const { detail } = e as CustomEvent<BookingSelection>;
        renderSelection(detail);
    });
    
    if(typeof calendar.getSelection === "function") {
        renderSelection(calendar.getSelection());
    }
    
    totalContainer.classList.add("totalContainer", "inline-flex", "flex");
    totalContainer.textContent = "Total kostnad:\u00A0";
    const noCard = document.createElement("div");
    noCard.innerHTML = `
    <label class="text-sm">
    <input type="checkbox" class="noCard-check">
    Betala på plats
    </label>`;
    
    summaryContainer.append(selectedTreatmentContainer, selectedDateContainer, totalContainer, noCard);
    renderConfirmedPopup();
    
    // BOKA-KNAPPEN //
    // ☆ Skapa boka-knappen och dess funktion 
    const cta = createButton({
        label: "Boka",
        variant: "primary",
        onClick: () => {
            const noCardCheckedbox = document.querySelector<HTMLInputElement>(".noCard-check");
            // ☆ Skapa en variabel för att "betala på plats" inte checkats i
            const noCardChecked = !!noCardCheckedbox?.checked;
            const anyTreatmentChecked = Array.from(document.querySelectorAll<HTMLInputElement>(".treatmentCheck")).some((checkBox => checkBox.checked));
            const { date, specialistName } = currentSelection;
            const selectedDate = currentSelection.date;
            
            showPopup();
            
            const confirmHeader = document.querySelector(".confirmHeader")!;
            const chosenStaff = document.querySelector(".chosenStaff") as HTMLElement;
            const chosenTreatment = document.querySelector(".chosenTreatment") as HTMLElement;
            const chosenDate = document.querySelector(".chosenDate") as HTMLElement;
            const confirmButton = document.querySelector(".confirmButton") as HTMLElement;
            const checkMark = document.querySelector(".checkMark") as HTMLElement;
            
            chosenTreatment?.classList.add("hidden");
            chosenDate?.classList.add("hidden");
            checkMark?.classList.add("hidden");
            
            confirmButton?.classList.remove("bg-red-600", "hover:bg-red-700");
            confirmButton?.classList.add("bg-dark-green", "hover:bg-light-green")
            
            // ☆ Om ingen behandling valts, visa varning
            if (!anyTreatmentChecked) {
                console.log("Choose at least 1 - You haven't selected a treatment.")
                confirmHeader.textContent = "Obs!";
                chosenStaff.textContent = "Du måste välja minst 1 behandling innan du bokar.";
                confirmButton.textContent = "OK";
            }
            // ☆ Om inget datum valts, men behandling har valts, visa varning
            else if (!selectedDate && anyTreatmentChecked) {
                console.log("Choose date - You've selected a treatment but no date.")
                confirmHeader.textContent = "Obs!";
                chosenStaff.textContent = "Du måste välja ett datum för att gå vidare.";
                confirmButton.textContent = "OK";
            }
            // ☆ Om datum och behandling har valts, men inte "betala kontant"-boxen
            else if (selectedDate && anyTreatmentChecked && !noCardChecked) {
                console.log("Accept card - Date and treatment are selected but you've not accepted our no card policy")
                confirmHeader.textContent = "Obs!";
                chosenStaff.textContent = "Vi godkänner tyvärr inte kortbetalningar - välj att betala på plats för att gå vidare.";
                confirmButton.textContent = "OK";
            }
            // ☆ Slutligen om datum, behandling och kontant har valts- visa bokning!
            else if (selectedDate && anyTreatmentChecked && noCardChecked) {
                console.log("Success, you've booked!")
                chosenDate.classList.remove("hidden");
                chosenTreatment.classList.remove("hidden");
                checkMark.classList.remove("hidden");
                confirmHeader.textContent = `Bokning bekräftad!`;
                
                const selectedTreatments = Array.from(document.querySelectorAll(".treatmentCheck:checked")).map(checkBox => checkBox.closest(".labelGroup")!.querySelector(".treatmentLabel")!.textContent);
                const treatmentListString = selectedTreatments.join(", ");
                
                chosenTreatment.innerHTML = `<b>Vald behandling:</b><br>${treatmentListString}`;
                chosenStaff.innerHTML = `<b>Vald specialist:</b><br>${specialistName}`;
                chosenDate.innerHTML = `<b>Datum:</b><br>${date}`;
                confirmButton.textContent = "Ångra";
                confirmButton.classList.remove("bg-dark-green", "hover:bg-light-green");
                confirmButton.classList.add("bg-red-600", "hover:bg-red-700");
            }
            // ☆ Else-case för ifall jag hade missat ett scenario,
            // vilket jag inte tror att jag har gjort.
            else {
                console.log("Something's gone terribly awry.")
            }
        }
    });
    
    cta.classList.add("min-w-fit");
    summaryContainer.append(cta);
    
    // BETALNINGS-SAMMANFATTNING //
    let totalNumber = document.createElement("p");
    // ☆ Börja med kostnad 0
    let cost = 0;
    totalNumber.textContent = `${cost} :-`;
    totalNumber.classList.add("font-extrabold");
    
    // ☆ Funktion för visning av vald behandling och kostnad
    function checkoutList() {
        treatmentContainer.textContent = "";
        // ☆ För varje behandling av behandlingslistan
        for (const treatment of sortedList) {
            // ☆ Skapa en checkbox
            const treatmentCheck = document.createElement("input");
            treatmentCheck.setAttribute("type", "checkbox");
            treatmentCheck.classList.add("treatmentCheck", "w-[30px]", "ml-[-30px]");
            // ☆ Skapa en bullet point i valda behandlingar-listan
            const selectedLi = document.createElement("li");
            // ☆ Eventlistener för ändringar i markering/avmarkering av checkbox
            treatmentCheck.addEventListener("change", function() {
                // ☆ Om en behandling har valts
                if (treatmentCheck.checked){
                    // ☆ Låt kostnaden vara kostnad + behandlingens kostnad
                    cost = Number(cost) + Number(treatment.cost);
                    // ☆ Visa totala summan med svensk tusenseparator och ":-"
                    totalNumber.textContent = cost.toLocaleString("sv-SE") + ":-";
                    selectedLi.textContent = treatment.name;
                    // ☆ Lägg till li-elementet med behandlingens namn
                    selectedUl.appendChild(selectedLi);
                }
                // ☆ Om en behandling avcheckas
                else {
                    // ☆ Låt kostnaden vara kostnaden minus behandlingens kostnad
                    cost = Number(cost) - Number(treatment.cost);
                    totalNumber.textContent = cost.toLocaleString("sv-SE") + ":-";
                    // ☆ Ta bort li-elementet med behandlingens namn
                    selectedUl.removeChild(selectedLi);
                }
                // ☆ Om fler än en behandling har valts, säg "valda behandlingar"
                if (selectedUl.children.length > 1) {
                    selectedTreatmentHeader.innerHTML = `<b>Valda behandlingar:</b>`;   
                }
                // ☆ Om bara en behandling valts, säg "vald behandling"
                else {
                    selectedTreatmentHeader.innerHTML = `<b>Vald behandling:</b>`;
                }
            })
            
            // ☆ Skapa listan på behandlingar
            const treatmentLabel = document.createElement("label");
            treatmentLabel.textContent = treatment.name;
            treatmentLabel.classList.add("treatmentLabel", "font-bold", "flex-1");
            
            const labelGroup = document.createElement("div");
            labelGroup.classList.add("labelGroup", "items-center", "flex", "flex-1", "gap-[10px]", "ml-[30px]");
            treatmentLabel.prepend(treatmentCheck);
            labelGroup.append(treatmentLabel);
            
            const treatmentCost = document.createElement("p");
            treatmentCost.textContent = Number(treatment.cost).toLocaleString("sv-SE") + ":-";
            treatmentCost.classList.add("treatmentCost", "text-right", "min-w-[60px]");
            
            const treatmentBox = document.createElement("div");
            treatmentBox.dataset.type = treatment.type.join(",");
            treatmentBox.classList.add("treatmentBox", "flex", "flex-row", "items-start");
            treatmentBox.append(labelGroup, treatmentCost);
            treatmentContainer.append(treatmentBox);
        }
        totalContainer.appendChild(totalNumber);  
    }
    checkoutList();
    return book;
}
