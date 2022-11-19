export const useCodeExecutor = (...paramNames: string[]): CodeExecutor => {
  return (code: string, ...params: any[]) => {
    const codeExecutor = new Function(...paramNames, code);
    try {
      const result = codeExecutor(...params);
      return {
        value: result,
      };
    } catch (error) {
      return { error };
    }
  };
};

export type CodeExecutor = (
  code: string,
  ...params: any[]
) => CodeExecutionResult;

export type CodeExecutionResult = {
  value?: any;
  error?: Error;
};
