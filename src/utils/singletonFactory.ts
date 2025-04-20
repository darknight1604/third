export class SingletonFactory {
  private static instances = new Map<string, any>();

  static getInstance<T>(key: string, creator: () => T): T {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
    return this.instances.get(key);
  }
}
