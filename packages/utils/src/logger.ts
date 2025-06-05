import chalk from "chalk";

/**
 * Logger object with methods for different log levels, with colored output.
 */
export const log = (...args: unknown[]) => {
	console.log(...args);
};

/**
 * Log a debug message in blue.
 */
log.debug = (...args: unknown[]) => {
	console.log(chalk.blue("[DEBUG]"), ...args);
};

/**
 * Log an info message in green.
 */
log.info = (...args: unknown[]) => {
	console.log(chalk.green("[INFO]"), ...args);
};

/**
 * Log an error message in red.
 */
log.error = (...args: unknown[]) => {
	console.error(chalk.red("[ERROR]"), ...args);
};
