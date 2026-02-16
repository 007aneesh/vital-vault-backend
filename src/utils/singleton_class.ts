import catchErrors from "../utils/catchErrors";

export const SingletonClass = <T extends { new (...args: any[]): object }>(
  Constructor: T,
) => {
  return class {
    private static instance: InstanceType<T> & { [key: string]: any };
    private constructor() {}

    static get config(): InstanceType<T> {
      if (!this.instance) {
        this.instance = new Constructor() as InstanceType<T>;

        // Wrap all async methods with catchErrors
        Object.getOwnPropertyNames(Constructor.prototype).forEach((method) => {
          if (method !== "constructor") {
            const originalMethod = this.instance[method];
            if (typeof originalMethod === "function") {
              (this.instance as any)[method] = catchErrors(
                originalMethod.bind(this.instance),
              );
            }
          }
        });
      }
      return this.instance;
    }
  };
};
