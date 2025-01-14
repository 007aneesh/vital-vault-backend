export const SingletonClass = <T extends { new (...args: any[]): object }>(
  constructor: T,
) => {
  return class {
    private static instance: InstanceType<T>;
    private constructor() {}

    static get config(): InstanceType<T> {
      return (this.instance ??= new constructor() as InstanceType<T>);
    }
  };
};
