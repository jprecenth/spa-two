import { reviews } from "../Lists";

export function addReview(name: string, text: string, rating: 1 | 2 | 3 | 4 | 5){
    reviews.unshift({ name, text, rating });

    //Spara till localStorage 
    const saved = JSON.parse(localStorage.getItem("userReviews") || "[]");
    saved.unshift({ name, text, rating });
    localStorage.setItem("userReviews", JSON.stringify(saved));
}
