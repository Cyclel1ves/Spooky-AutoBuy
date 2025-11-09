const { logError, logInfo } = require('./logging');


function initTasksForBot(bot) {
    bot._taskQueue = [];
    bot._isRunningTask = false;
}


function getBotTaskQueueSize(bot) {
    return bot._taskQueue ? bot._taskQueue.length : 0;
}


function enqueueTask(bot, task) {
    if (typeof task !== 'function') {
        logError(`[Tasks] Попытка добавить некорректную задачу (не функция)`, 'tasks');
        return;
    }
    if (!bot._taskQueue) {
        logError(`[Tasks] У бота ${bot.username} не инициализирована очередь задач!`, 'tasks');
        return;
    }

    if (bot._taskQueue.some(t => t === task)) {
        const taskName = task.name || 'anonymous';
        logInfo(`[Tasks] Задача "${taskName}" уже в очереди бота ${bot.username}. Пропускаем...`, 'tasks');
        return;
    }

    const taskName = task.name || 'anonymous';
    bot._taskQueue.push(task);
    logInfo(`[Tasks] Добавлена задача "${taskName}" в очередь бота ${bot.username}`, 'tasks');

    runNextTask(bot);
}


async function runNextTask(bot) {
    if (bot._isRunningTask) {
        return;
    }
    if (!bot._taskQueue || bot._taskQueue.length === 0) {
        return;
    }

    const task = bot._taskQueue.shift();
    const taskName = task.name || 'anonymous';

    bot._isRunningTask = true;
    logInfo(`[Tasks] Начало выполнения задачи "${taskName}" у бота ${bot.username}`, 'tasks');
    try {
        await task();
        logInfo(`[Tasks] Задача "${taskName}" у бота ${bot.username} выполнена`, 'tasks');
    } catch (err) {
        logError(`[Tasks] Ошибка в задаче "${taskName}" у бота ${bot.username}: ${err.message}`, 'tasks');
    } finally {
        bot._isRunningTask = false;
        setImmediate(() => runNextTask(bot));
    }
}

module.exports = {
    initTasksForBot,
    enqueueTask,
    getBotTaskQueueSize
};
