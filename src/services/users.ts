import { UserModel, IUser } from '../models/users';

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).select('+password');
  }

  async createUser(userData: Omit<IUser, 'role'>): Promise<IUser> {
    const user = new UserModel(userData);
    return user.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  async updateUser(
    id: string,
    userData: Partial<Pick<IUser, 'email' | 'password'>>
  ): Promise<IUser | null> {
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
}