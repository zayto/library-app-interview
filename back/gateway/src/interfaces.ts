// TODO Find a way to retrieve the IUserResponse from Users module directly to avoid duplication
export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  books: string[];
}
