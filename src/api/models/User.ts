export interface User {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // 👈 Add this
  createdAt?: Date;
}
