const chalk = require('chalk');

const Logger = {
    log: function (...messages) {
        messages = messages.map(message => this.prettier(message));
        if(messages[0] in this) this[messages[0]](...messages.slice(1));
        else console.log(`${this.getDate()} ${messages.join(' ')}`);
    },
    success: { label: 'success', color: 'greenBright', emoji: '🎉' },
    info: { label: 'info', color: 'green', emoji: '💬' },
    event: { label: 'event', color: 'magenta', emoji: '💫' },
    stats: { label: 'stats', color: 'yellowBright', emoji: '📊' },
    network: { label: 'network', color: 'cyan', emoji: '🌐' },
    security: { label: 'security', color: 'blueBright', emoji: '🔒' },
    warn: { label: 'warn', color: 'yellow', emoji: '⚠️' },
    debug: { label: 'debug', color: 'blue', emoji: '🐞' },
    verbose: { label: 'verbose', color: 'gray', emoji: '🔍'},
    trace: { label: 'trace', color: 'gray', emoji: '🐛' },
    error: { label: 'error', color: 'red', emoji: '🚨' },
    critical: { label: 'critical', color: 'redBright', emoji: '💣' },
    fatal: { label: 'fatal', color: 'bgRed', emoji: '💥' },
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
Logger.define = function ({ label, color = 'white', emoji = null } = {}) {
    this[label] = (...messages) => {
        console.log(`${this.getDate()} ${chalk[color](`${emoji ? `${emoji} ` : ''}${label}`) + ' '}${messages.map(message => this.prettier(message)).join(' ')}`);
    }
}
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
        } else {
            return chalk.reset.white
                `${chalk.gray(`<Object(${Object.keys(message).length})>`)} ${chalk.reset('\x7B')} ${Object.entries(message)
                    .map(([key, value]) => `${chalk.reset.cyan(key)}: ${chalk.greenBright.bold(Logger.prettier(value))}`)
                    .join(chalk.reset(', '))} ${chalk.reset('\x7D')}`;
        }
    } else {
        return message;
    }
};

Object.keys(Logger).forEach(level => {
    if(Logger[level] && Logger[level].label) {
        Logger.define(Logger[level]);
    }
})

module.exports = Logger;