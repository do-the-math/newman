interface ErrorWithStatus extends Error {
  code?: string;
  syscall?: string;
  message: string;
}

export { ErrorWithStatus };
