import { PrismaClient, User } from '@prisma/client/user';
import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';
export default class UserRepository {
  prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  /*connectUser(username: string, password: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const rows: User[] = statement.get(username, password);
    return rows.pop();
  }*/

  async getAllUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async getUserById(idParam: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: idParam,
      },
    });
    return user;
  }

  async createUser(data: User): Promise<User> {
    data.password = createHash('sha256').update(data.password).digest('base64');
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async connect(username: string, password: string): Promise<string> {
    const res = await this.prisma.user.findFirst({
      where: {
        username: username,
        password: createHash('sha256').update(password).digest('base64'),
      },
    });
    if (!res) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: res.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
  }
}
