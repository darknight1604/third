import {INote} from '@third/models/note';
import {IReposioty} from '@third/repositories/iRepository';
import {RepoSingletonFactory} from '@third/repositories/repoSingletonFactory';

class LocalRepository implements IReposioty<INote> {
  static getInstance(): LocalRepository {
    return RepoSingletonFactory.getInstance(
      'NoteLocalRepository',
      () => new LocalRepository(),
    );
  }

  getList(_params: unknown): Promise<INote[]> {
    throw new Error('Method not implemented.');
  }

  save(_params: unknown, _onPost?: () => void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default LocalRepository;
