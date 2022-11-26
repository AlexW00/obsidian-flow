export const useCodeExecutor = (...paramNames: string[]): CodeExecutor => {
  return async (code: string, ...params: any[]) => {
    try {
      const AsyncFunction = Object.getPrototypeOf(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        async function () {}
      ).constructor;
      const codeExecutor = new AsyncFunction(...paramNames, code);
      return codeExecutor(...params);
    } catch (error) {
      return { error };
    }
  };
};

export type CodeExecutor = (
  code: string,
  ...params: any[]
) => Promise<CodeExecutionResult>;

export type CodeExecutionResult = {
  value?: any;
  error?: Error;
};
