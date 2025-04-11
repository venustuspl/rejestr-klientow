export interface UserLoginData {
  username: string;
  password: string;
}

export interface GetUsersResponse {
  id: number;
  email: string;
  username: string;
  password: string;
}

export class User {
  constructor(public email: string, public username: string) {}
}
