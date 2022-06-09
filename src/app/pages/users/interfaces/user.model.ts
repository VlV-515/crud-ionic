export interface UserInterface {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
  avatar: string;
}

export interface UserResponseInterface {
  status: number;
  msg: string;
}
