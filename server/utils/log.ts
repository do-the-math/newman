import chalk from 'chalk';

const logError = (ctx): void => console.log(chalk.redBright(ctx));

const logConsole = (ctx): void => console.log(chalk.white(ctx));

const logInfo = (ctx): void => console.log(chalk.yellowBright(ctx));

export { logError, logConsole, logInfo };
