import { FormControl } from "@angular/forms";

export interface QuizForm {
    category: FormControl<string | null>;
    subCategory: FormControl<string | null>;
    difficulty: FormControl<string | null>;
}