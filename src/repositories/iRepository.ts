export interface IReposioty<T> {
  save(params: unknown, onPost?: () => void): Promise<void>;
  getList(params: unknown): Promise<T[]>;
}
