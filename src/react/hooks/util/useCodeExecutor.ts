export const useCodeExecutor = (...paramNames: string[]): CodeExecutor => {
  return (code: string, ...params: any[]) => {
    try {
      const codeExecutor = new Function(...paramNames, code);
      const result = codeExecutor(...params);
      console.log("executed codeExecutor success");
      return {
        value: result,
      };
    } catch (error) {
      console.log("executed codeExecutor error");
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
