/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk';

const logError = (ctx, e: any): void => console.log(chalk.redBright(ctx), e);

const logConsole = (ctx): void => console.log(chalk.white(ctx));

const logInfo = (ctx): void => console.log(chalk.yellowBright(ctx));

export { logError, logConsole, logInfo };
