import {AnglerModel, IAngler} from '../models/anglers';

export class AnglerService {
  async getAllAnglers(): Promise<IAngler[]> {
    return AnglerModel.find();
  }

  async getAnglerById(id: string): Promise<IAngler | null> {
    return AnglerModel.findById(id);
  }

  async getAnglerByUserId(userId: string): Promise<IAngler | null> {
    return AnglerModel.findOne({ user: userId });
  }

async createAngler(anglerData: Omit<IAngler, 'sessions'>): Promise<IAngler> {
  const angler = new AnglerModel(anglerData);
  return angler.save();
}

async updateAngler(
  id: string,
  anglerData: Partial<Pick<IAngler, 'name'>>
): Promise<IAngler | null> {
  return AnglerModel.findByIdAndUpdate(id, anglerData, { new: true, runValidators: true });
}

  async deleteAngler(id: string): Promise<IAngler | null> {
    return AnglerModel.findByIdAndDelete(id);
  }
}