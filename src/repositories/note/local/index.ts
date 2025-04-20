import {INote} from '@third/models/note';
import {IReposioty} from '@third/repositories/iRepository';

class LocalRepository implements IReposioty<INote> {
  private static instance: LocalRepository;

  private constructor() {}

  static getInstance(): LocalRepository {
    if (!LocalRepository.instance) {
      LocalRepository.instance = new LocalRepository();
    }
    return LocalRepository.instance;
  }

  getList(_params: unknown): Promise<INote[]> {
    throw new Error('Method not implemented.');
  }

  save(_params: unknown, _onPost?: () => void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default LocalRepository;
