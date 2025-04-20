import {IReposioty} from '@third/repositories/iRepository';

export default abstract class BaseService<T> {
  localRepo: IReposioty<T>;
  remoteRepo: IReposioty<T>;

  constructor(localRepo: IReposioty<T>, remoteRepo: IReposioty<T>) {
    this.localRepo = localRepo;
    this.remoteRepo = remoteRepo;
  }
}
