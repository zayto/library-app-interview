export interface IUserRequest {
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  books: string[];
}
