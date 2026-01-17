
const { logInfo, logWarn, logError } = require('./logging');
const { delay, getLoreFromNbt, extractPlainText } = require('./utils');
function checkNbtViaParser(nbt, req) {
  try {
    const mod = require('./ahParseBuy');
    if (mod && typeof mod.checkNbtRequirements === 'function') {
      return mod.checkNbtRequirements(nbt, req);
    }
    logWarn('[Inventory] checkNbtRequirements пока недоступна (circular require).', 'inventory');
    return false;
  } catch (e) {
    logError(`[Inventory] Не удалось загрузить checkNbtRequirements: ${e.message}`, 'inventory');
    return false;
  }
}



function getItemEnchantments(item) {
    if (!item.nbt || !item.nbt.value || !item.nbt.value.Enchantments) return [];
    const enchData = item.nbt.value.Enchantments;
    if (!enchData.value || !enchData.value.value) return [];
    return enchData.value.value.map(enc => ({
        id: enc.id && enc.id.value ? enc.id.value : enc.id,
        lvl: enc.lvl && enc.lvl.value ? parseInt(enc.lvl.value, 10) : parseInt(enc.lvl, 10)
    }));
}

function getItemDisplayName(item) {
    let itemDisplayName = '';

    if (item.nbt && item.nbt.value) {
        if (
            item.nbt.value.display &&
            item.nbt.value.display.value &&
            item.nbt.value.display.value.Name &&
            item.nbt.value.display.value.Name.value
        ) {
            let nameObj = item.nbt.value.display.value.Name.value;
            if (typeof nameObj === 'string') {
                try {
                    nameObj = JSON.parse(nameObj);
                } catch (e) {
                    console.error('Ошибка при разборе JSON display.Name:', e);
                }
            }
            if (Array.isArray(nameObj.extra)) {
                itemDisplayName = nameObj.extra.map(part => part.text || '').join('');
            } else if (nameObj.text) {
                itemDisplayName = nameObj.text;
            }
        }
        if (!itemDisplayName && item.nbt.value.Name) {
            let nameObj = item.nbt.value.Name;
            if (typeof nameObj === 'string') {
                try {
                    nameObj = JSON.parse(nameObj);
                } catch (e) {
                    console.error('Ошибка при разборе JSON Name:', e);
                }
            }
            if (Array.isArray(nameObj.extra)) {
                itemDisplayName = nameObj.extra.map(part => part.text || '').join('');
            } else if (nameObj.text) {
                itemDisplayName = nameObj.text;
            }
        }
    }
    return itemDisplayName;
}


function getItemCustomEnchantments(item) {
    if (!item.nbt || !item.nbt.value || !item.nbt.value['custom-enchantments']) {
        return [];
    }
    const enchData = item.nbt.value['custom-enchantments'];
    if (!enchData.value || !enchData.value.value) {
        return [];
    }
    return enchData.value.value.map(enc => ({
        id: enc.type && enc.type.value ? enc.type.value : enc.type,
        lvl: enc.level && enc.level.value ? parseInt(enc.level.value, 10) : parseInt(enc.level, 10)
    }));
}




function getItemAttributeModifiers(item) {
    if (!item.nbt || !item.nbt.value || !item.nbt.value.AttributeModifiers) return [];
    const attrData = item.nbt.value.AttributeModifiers;
    if (!attrData.value || !attrData.value.value) return [];
    return attrData.value.value.map(attr => ({
        AttributeName: attr.AttributeName && attr.AttributeName.value ? attr.AttributeName.value : attr.AttributeName,
        Amount: attr.Amount && attr.Amount.value ? Number(attr.Amount.value) : Number(attr.Amount),
        Slot: attr.Slot && attr.Slot.value ? attr.Slot.value : attr.Slot
    }));
}


function getItemLore(item) {
    if (!item.nbt || !item.nbt.value || !item.nbt.value.display || !item.nbt.value.display.Lore) return "";
    const loreData = item.nbt.value.display.Lore;
    if (!loreData.value || !loreData.value.value) return "";
    return loreData.value.value.join(" ");
}


function hasExpLvl(nbt) {
  if (!nbt || !nbt.value) return false;

  if (Object.prototype.hasOwnProperty.call(nbt.value, 'exp-lvl')) return true;

  const pbv = nbt.value.PublicBukkitValues;
  const pbvObj = pbv && (pbv.value || pbv);
  if (pbvObj && pbvObj['spookystash:levels'] != null) return true;

  return getExpLvlFromLore(nbt) !== null;
}



function getExpLvlFromLore(nbt) {
    const loreArray = getLoreFromNbt(nbt);
    const combinedLore = loreArray.map(line => extractPlainText(line)).join(' ');
    const expLvlRegex = /(?:Уровень:|Содержит:\s*)(\d+)/i;
    const match = combinedLore.match(expLvlRegex);
    return match ? parseInt(match[1], 10) : null;
}


function isInventoryItemMatchingTarget(item, req) {
    if (req.expLvlMissing) {
        if (hasExpLvl(item.nbt)) {
            logInfo(
                `[DEBUG] isInventoryItemMatchingTarget: Обнаружено поле exp-lvl, хотя требовалось его отсутствие`,
                'debug'
            );
            return false;
        }
    }

    if (req.displayName) {
        const itemDisplayName = getItemDisplayName(item);
        if (!itemDisplayName.includes(req.displayName)) {
            return false;
        }
    }

    if (req.expLvl !== undefined) {
        const lvl = getExpLvlFromLore(item.nbt);
        if (lvl === null || lvl !== req.expLvl) {
            logInfo(
                `[DEBUG] isInventoryItemMatchingTarget: Уровень опыта ${lvl} не соответствует требуемому ${req.expLvl}`,
                'debug'
            );
            return false;
        }
    }

    if (req.loreContains) {
        const loreText = getItemLore(item);
        const haystack = loreText || JSON.stringify(item.nbt);
        if (!haystack.includes(req.loreContains)) {
            logInfo(
                `[DEBUG] isInventoryItemMatchingTarget: Не найдено "${req.loreContains}" в lore/NBT`,
                'debug'
            );
            return false;
        }
    }

    if (req.Enchantments) {
        const itemEnchs = getItemEnchantments(item);
        for (const reqEnc of req.Enchantments) {
            const found = itemEnchs.find(enc => enc.id === reqEnc.id && enc.lvl === reqEnc.lvl);
            if (!found) {
                logInfo(
                    `[DEBUG] isInventoryItemMatchingTarget: Не найдено зачарование ${reqEnc.id} lvl ${reqEnc.lvl}`,
                    'debug'
                );
                return false;
            }
        }
    }

    if (req.customEnchantments) {
        const itemCustomEnchs = getItemCustomEnchantments(item);
        if (!itemCustomEnchs || itemCustomEnchs.length === 0) {
            logInfo(
                `[DEBUG] isInventoryItemMatchingTarget: Не найдены пользовательские зачарования для ${item.name}`,
                'debug'
            );
            return false;
        }
        for (const reqEnc of req.customEnchantments) {
            const found = itemCustomEnchs.find(enc => enc.id === reqEnc.id && enc.lvl === reqEnc.lvl);
            if (!found) {
                logInfo(
                    `[DEBUG] isInventoryItemMatchingTarget: Не найдено пользовательское зачарование ${reqEnc.id} lvl ${reqEnc.lvl} для ${item.name}`,
                    'debug'
                );
                return false;
            }
        }
    }

    if (req.AttributeModifiers) {
        const itemAttrs = getItemAttributeModifiers(item);
        for (const reqAttr of req.AttributeModifiers) {
            const found = itemAttrs.find(attr => {
                const nameMatches =
                    attr.AttributeName === reqAttr.AttributeName ||
                    attr.AttributeName === ('minecraft:' + reqAttr.AttributeName) ||
                    ('minecraft:' + attr.AttributeName) === reqAttr.AttributeName;

                return (
                    nameMatches &&
                    attr.Slot === reqAttr.Slot &&
                    Number(attr.Amount) === Number(reqAttr.Amount)
                );
            });
            if (!found) {
                logInfo(
                    `[DEBUG] isInventoryItemMatchingTarget: Не найден модификатор ${reqAttr.AttributeName} со значением ${reqAttr.Amount} в слоте ${reqAttr.Slot}`,
                    'debug'
                );
                return false;
            }
        }
    }

    return true;
}


function getInventoryMatchedTarget(item, targetItems) {
    for (const target of targetItems) {
        if (item.name !== target.name) continue;

        if (target.requiredNbt) {
            const ok = checkNbtViaParser(item.nbt, target.requiredNbt);
            if (ok) {
                logInfo(`[DEBUG] getInventoryMatchedTarget: Предмет "${item.name}" прошёл NBT-проверку для цели "${target.id}"`, 'debug');
                return target;
            } else {
                logInfo(`[DEBUG] getInventoryMatchedTarget: Предмет "${item.name}" НЕ прошёл NBT-проверку для цели "${target.id}"`, 'debug');
                continue;
            }
        }

        return target;
    }
    return null;
}


function startInventoryMonitoring(bot, targetItems, checkInterval = 5000) {
    async function checkInventoryAndDrop() {
        try {
            const itemsToDrop = bot.inventory.items().filter(item => {
                const target = getInventoryMatchedTarget(item, targetItems);
                logInfo(
                    `[Inventory] Предмет ${item.name} (x${item.count}) является целевым: ${!!target}`,
                    'inventory'
                );
                return !target;
            });

            for (const item of itemsToDrop) {
                let nbtLog = 'нет nbt';
                if (item.nbt) {
                    nbtLog = JSON.stringify(item.nbt);
                }
                logInfo(
                    `[Inventory] Перед удалением предмета "${item.name}" (x${item.count}). NBT: ${nbtLog}`,
                    'inventory'
                );

                logInfo(
                    `[Inventory] ${bot.customUsername} сбрасывает: ${item.name} x${item.count}`,
                    'inventory'
                );
                try {
                    await bot.tossStack(item);
                } catch (err) {
                    logWarn(
                        `[Inventory] Ошибка при сбросе ${item.name}: ${err.message}`,
                        'inventory'
                    );
                }
                await delay(800);
            }
        } catch (err) {
            logError(
                `[Inventory] Ошибка при проверке инвентаря: ${err.message}`,
                'inventory'
            );
        }
    }

    setInterval(() => checkInventoryAndDrop(), checkInterval);
}

module.exports = {
    startInventoryMonitoring,
    getInventoryMatchedTarget
};
