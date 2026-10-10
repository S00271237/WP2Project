import {AnglerModel, IAngler, ICatch, ISession} from '../models/anglers';

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


async addSessionToAngler(
  anglerId: string,
  sessionData: Omit<ISession, 'catches'>): Promise<IAngler | null> {
  const angler = await AnglerModel.findById(anglerId);
  if (!angler) {
    return null;
  }

  angler.sessions.push(sessionData as ISession);
  return angler.save();
    }

async addCatchToSession(
  anglerId: string,
  sessionId: string,
  catchData: ICatch
): Promise<IAngler | null> {
  const angler = await AnglerModel.findById(anglerId);
  if (!angler) {
    return null;
  }

  const session = angler.sessions.id(sessionId);
  if (!session) {
    return null;
  }

  session.catches.push(catchData);
  return angler.save();
}

async updateSessioninAngler(
  anglerId: string,
  sessionId: string,
  sessionData: Partial<Omit<ISession, 'catches'>>
): Promise<IAngler | null> {
  const angler = await AnglerModel.findById(anglerId);
  if (!angler) {
    return null;
  }

  const session = angler.sessions.id(sessionId);
  if (!session) {
    return null;
  }


  session.set(sessionData);

    if (session.endTime && session.endTime <= session.startTime) {
  throw new Error('endTime must be after startTime');
}
  return angler.save();
}

async updateCatchInSession(
  anglerId: string,
  sessionId: string,
  catchId: string,
  catchData: Partial<ICatch>
): Promise<IAngler | null> {
  const angler = await AnglerModel.findById(anglerId);
  if (!angler) {
    return null;
  }

  const session = angler.sessions.id(sessionId);
  if (!session) {
    return null;
  }

  const catchItem = session.catches.id(catchId);
  if (!catchItem) {
    return null;
  }

  catchItem.set(catchData);
  return angler.save();
}

async deleteSessionFromAngler(
    anglerId: string,
    sessionId: string
    ): Promise<IAngler | null> {

    const angler = await AnglerModel.findById(anglerId);
    if (!angler) {
      return null;
    }

    const session = angler.sessions.id(sessionId);
    if (!session) {
      return null;
    }

    session.deleteOne();
    return angler.save();
  }

  async deleteCatchFromSession(
  anglerId: string,
  sessionId: string,
  catchId: string
): Promise<IAngler | null> {
  const angler = await AnglerModel.findById(anglerId);
  if (!angler) {
    return null;
  }

  const session = angler.sessions.id(sessionId);
  if (!session) {
    return null;
  }

  const catchItem = session.catches.id(catchId);
  if (!catchItem) {
    return null;
  }

  catchItem.deleteOne();
  return angler.save();
}
}

