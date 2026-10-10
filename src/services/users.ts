import { PassThrough } from 'stream';
import { UserModel, IUser } from '../models/users';
import bcrypt from "bcrypt";
import { promises } from 'dns';

const saltRounds = 10; // name used in tutorials

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).select('+password');
  }

  async createUser(userData: Omit<IUser, 'role'>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
    const user = new UserModel({...userData, password: hashedPassword});
    return user.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  async updateUser(
    id: string,
    userData: Partial<Pick<IUser, 'email' | 'password'>>
  ): Promise<IUser | null> {
    const data = {...userData};
    if (data.password){
        data.password = await bcrypt.hash(data.password, saltRounds)
    }
    return UserModel.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id);
  }

  async updateUserRole(
    id: string,
    role: IUser['role']
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
  }

  async verifyPassword(email: string, password: string): Promise<IUser | null>{
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const matches = await bcrypt.compare(password, user.password);
    return matches ? user : null;
  }
}