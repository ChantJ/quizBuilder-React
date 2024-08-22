export class CreateQuizDto {
  readonly title: string;
  readonly questions: string;
  readonly permalink: string;
  readonly userID: number;
}
