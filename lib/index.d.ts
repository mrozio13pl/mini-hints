import * as chalk from 'chalk';

type LogLevel = {
    label: string;
    color: keyof typeof chalk;
    prefix: string;
};

type LoggerFunction = (...messages: any[]) => void;

type Logger = {
    log: (...messages: any[]) => void;
    define: (name: string, options?: { label?: string | null; color?: keyof typeof chalk; prefix?: string | null; replace?: boolean } | undefined) => LoggerFunction;
    array: (arr: Array<any>) => void;
    json: (json: any) => void;
    success: (...message: any[]) => void;
    info: (...message: any[]) => void;
    event: (...message: any[]) => void;
    stats: (...message: any[]) => void;
    watch: (...message: any[]) => void;
    network: (...message: any[]) => void;
    security: (...message: any[]) => void;
    warn: (...message: any[]) => void;
    debug: (...message: any[]) => void;
    verbose: (...message: any[]) => void;
    trace: (...message: any[]) => void;
    error: (...message: any[]) => void;
    critical: (...message: any[]) => void;
    fatal: (...message: any[]) => void;
    [key: string]: LoggerFunction;
};

type LogLevels = {
    [key: string]: LogLevel;
};

declare const Logger: Logger;
declare const LogLevels: LogLevels;

export default Logger;