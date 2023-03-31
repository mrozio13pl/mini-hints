const chalk = require('chalk');

const Logger = {
    log: function (...messages) {
        messages = messages.map(message => this.prettier(message));
        if(messages[0] in this) this[messages[0]](...messages.slice(1));
        else console.log(`${this.getDate()} ${messages.join(' ')}`);
    },
    define: function (name, { label = null, color = 'gray', prefix = null, replace = false } = {}) {
        return !replace && this[name] ? (...messages) => this[name](messages) : this[name || label] = (...messages) => {
            console.log(`${this.getDate()} ${chalk[color](`${prefix ? `${prefix} ` : ''}${label || name}`) + ' '}${messages.map(message => this.prettier(message)).join(' ')}`);
        }
    },
    array: function (arr) {
        if(!Array.isArray(arr)) return this.error(new Error(arr + ' is not a valid array'));
        const formattedArr = arr.map((item) => {
          return Logger.prettier(item);
        });
        this.log(formattedArr.join(", "));
    },
    json: function (json) {
        this.log(JSON.stringify(json, null, 2));
    }
};
Logger.getDate = () => chalk.gray(new Date().toLocaleTimeString('en-US', { hour12: false }));

Logger.prettier = message => {
    if (typeof message === 'boolean') {
        return chalk.bold.blue(message);
    }
    else if (typeof message === 'number') {
        return chalk.bold.yellowBright(message);
    }
    else if (message instanceof Error) {
        return chalk.reset.red(`${message.message}\n${message.stack}`);
    } else if (message === null) {
        return chalk.reset.strikethrough.gray('null');
    } else if (message === undefined) {
        return chalk.reset.strikethrough.gray('undefined');
    }
    else if (typeof message === 'object') {
        if (Array.isArray(message)) {
            return chalk.reset`${chalk.gray`<Array(${message.length})> ${chalk.reset.magentaBright('\x5B')} `}` + chalk.greenBright.bold(message.map(message => Logger.prettier(message)).join(chalk.reset(', '))) + chalk.magentaBright` ${chalk.reset.magentaBright('\x5D')}`;
        } else if (message instanceof Error) {
            return chalk.red.bold`${message.name}: ${message.message}`;
        } else if (message instanceof Date) {
            return chalk.yellowBright.bold
                `${message.getFullYear()}-${
                    String(message.getMonth() + 1).padStart(2, '0')
                }-${String(message.getDate()).padStart(2, '0')} ${String(message.getHours()).padStart(2, '0')}:${String(message.getMinutes()).padStart(2, '0')}:${String(message.getSeconds()).padStart(2, '0')}`;
        } else if (message instanceof RegExp) {
            return chalk.blue.bold(message.toString());
        } else if (message instanceof Map) {
            const result = [...message.entries()].map(entry => `${chalk.reset.cyan(Logger.prettier(entry[0]))} => ${chalk.green(Logger.prettier(entry[1]))}`).join(chalk.reset(', '));
            return chalk.reset.white`${chalk.reset.gray(`<Map(${message.size})>`)} ${chalk.reset('\x7B')} ${result} ${chalk.reset('\x7D')}`;
        } else if (message instanceof Set){
            const entries = [...message];
            return chalk.reset`${chalk.reset.gray(`<Set(${message.size})>`)}`+` ${chalk.reset.white('\x5B')} ` + chalk.greenBright.bold(entries.map(message => Logger.prettier(message)).join(chalk.reset(', '))) + ` ${chalk.reset('\x5D')}`;
        } else if (message instanceof Object){
            return chalk.reset.white
                `${chalk.gray(`<Object(${Object.keys(message).length})>`)} ${chalk.reset('\x7B')} ${Object.entries(message)
                    .map(([key, value]) => `${chalk.reset.cyan(key)}: ${chalk.greenBright.bold(Logger.prettier(value))}`)
                    .join(chalk.reset(', '))} ${chalk.reset('\x7D')}`;
        } else {
            return JSON.stringify(message, null, 2);
        }
    } else {
        return message;
    }
};

const LogLevels = {
    success: { label: 'success', color: 'greenBright', prefix: '🎉' },
    info: { label: 'info', color: 'green', prefix: '💬' },
    event: { label: 'event', color: 'magenta', prefix: '💫' },
    stats: { label: 'stats', color: 'yellowBright', prefix: '📊' },
    watch: { label: 'watching', color: 'yellow', prefix: '🚥'},
    network: { label: 'network', color: 'cyan', prefix: '🌐' },
    security: { label: 'security', color: 'blueBright', prefix: '🔒' },
    warn: { label: 'warn', color: 'yellow', prefix: '⚠️' },
    debug: { label: 'debug', color: 'blue', prefix: '🐞' },
    verbose: { label: 'verbose', color: 'gray', prefix: '🔍'},
    trace: { label: 'trace', color: 'gray', prefix: '🐛' },
    error: { label: 'error', color: 'red', prefix: '🚨' },
    critical: { label: 'critical', color: 'redBright', prefix: '💣' },
    fatal: { label: 'fatal', color: 'bgRed', prefix: '💥' }
}

module.exports = {
    define: Logger.define,
    success: Logger.define('success', LogLevels.success),
    info: Logger.define('info', LogLevels.info),
    event: Logger.define('event', LogLevels.event),
    stats: Logger.define('stats', LogLevels.stats),
    watch: Logger.define('watch', LogLevels.watch),
    network: Logger.define('network', LogLevels.network),
    security: Logger.define('security', LogLevels.security),
    warn: Logger.define('warn', LogLevels.warn),
    debug: Logger.define('debug', LogLevels.debug),
    verbose: Logger.define('verbose', LogLevels.verbose),
    trace: Logger.define('trace', LogLevels.trace),
    error: Logger.define('error', LogLevels.error),
    critical: Logger.define('critical', LogLevels.critical),
    fatal: Logger.define('fatal', LogLevels.fatal),
    ...Logger
}