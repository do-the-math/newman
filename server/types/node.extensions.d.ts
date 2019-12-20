interface ErrorWithStatus extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
  status?: number;
  fields?: string[];
  message: string;
  name: string;
}

export { ErrorWithStatus };
