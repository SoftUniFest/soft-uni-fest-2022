import  winston from 'winston';

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'logs/server.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: ${[info.type]} | ${info.timestamp} | ${info.status}: ${info.message}: ${info.errorMsg}`),
            )
        }),
    ]
};

export const logger = winston.createLogger(logConfiguration);
