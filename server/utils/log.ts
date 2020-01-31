import chalk from 'chalk';

const logError = (ctx: any, e: any): void =>
  console.log(chalk.redBright(ctx), e);

const logConsole = (ctx: any): void =>
  console.log(chalk.white(ctx));

const logInfo = (ctx: any): void =>
  console.log(chalk.yellowBright(ctx));

const logBanner = (ctx: any): void =>
  console.log(chalk.blueBright(ctx));

export { logError, logConsole, logInfo, logBanner };
