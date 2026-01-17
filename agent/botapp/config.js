module.exports = {
    logging: {
        chat: true,
        auction: true,
        balance: true,
        info: true,
        warn: true,
        error: true,
        tasks: true 
    },
    auction: {
        pageDelay: 300,
        maxPages: 5,
        helperCheckDelay: 1000,
        minTimeLeft: 32390
    },
    bot: {
        host: 'SpookyTime.net',
        port: 25565,
        version: '1.18.2',
        password: process.env.BOT_PASSWORD || '4344442',
        wipeDate: "2025-02-07T14:00:00Z"
    }
};
