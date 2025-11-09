


const targetItems = [
    {
        id: 'no',
        name: 'no',
        displayName: 'no',
        searchKeyword: 'no',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,

        lastUpdated: null
    },
    {
        id: 'fleva_potion_1',
        name: 'splash_potion',
        displayName: 'Моча Флеша',
        searchKeyword: 'Моча Флеша',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 8, Amplifier: 0, Duration: 3600 },
                { Id: 1, Amplifier: 2, Duration: 3600 }
            ],
            exactPotionEffects: true
        }
    },

    {
        id: 'netherite_sword_zz',
        name: 'netherite_sword',
        displayName: 'Меч Крушителя',
        searchKeyword: 'Меч Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { id: 'minecraft:bane_of_arthropods', lvl: 2 },
                { id: 'minecraft:fire_aspect', lvl: 2 },
                { id: 'minecraft:looting', lvl: 5 },
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:sharpness', lvl: 7 },
                { id: 'minecraft:sweeping', lvl: 5 }
            ],
            customEnchantments: {
                'spookyenchantments:vampir-enchantment': 2,
                'spookyenchantments:experienced-enchantment': 3,
                'spookyenchantments:poison-enchantment': 3,
                'spookyenchantments:detect-enchantment': 3,
                'spookyenchantments:oxid-enchantment': 2
            },
        }
    },

    {
        id: 'otryzhka_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Отрыжки',
        searchKeyword: 'Зелье Отрыжки',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 15, Amplifier: 0, Duration: 200 },
                { Id: 24, Amplifier: 0, Duration: 3600 },
                { Id: 17, Amplifier: 10, Duration: 1800 },
                { Id: 2, Amplifier: 2, Duration: 3600 },
                { Id: 20, Amplifier: 4, Duration: 600 }
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'medic_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Медика',
        searchKeyword: 'Зелье Медика',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 21, Amplifier: 2, Duration: 900 },
                { Id: 10, Amplifier: 2, Duration: 900 }
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'killer_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Киллера',
        searchKeyword: 'Зелье Киллера',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 11, Amplifier: 0, Duration: 3600 },
                { Id: 5, Amplifier: 3, Duration: 1800 }
            ],
        }
    },
    {
        id: 'agent_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье агента',
        searchKeyword: 'Зелье агента',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 14, Amplifier: 0, Duration: 18000 },
                { Id: 12, Amplifier: 0, Duration: 18000 },
                { Id: 1, Amplifier: 2, Duration: 18000 },
                { Id: 3, Amplifier: 0, Duration: 3600 },
                { Id: 5, Amplifier: 2, Duration: 6000 }
            ]
        }
    },

    {
        id: 'winner_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Победителя',
        searchKeyword: 'Зелье Победителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 14, Amplifier: 0 },
                { Id: 21, Amplifier: 1 },
                { Id: 10, Amplifier: 1 },
                { Id: 11, Amplifier: 0 }
            ],
        }
    },
    {
        id: 'netherite_pickaxe_1',
        name: 'netherite_pickaxe',
        displayName: 'Мега-бульдозер кирка',
        searchKeyword: 'Мега-бульдозер кирка',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            customEnchantments: [
                { id: 'megabuldozing', lvl: 1 },
            ]
        }
    },
    {
        id: 'netherite_pickaxe_2',
        name: 'netherite_pickaxe',
        displayName: 'Кирка Крушителя',
        searchKeyword: 'Кирка Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:efficiency', lvl: 10 },
                { id: 'minecraft:fortune', lvl: 5 },
                { id: 'minecraft:unbreaking', lvl: 5 }
            ],
            customEnchantments: [
                { id: 'web', lvl: 1 },
                { id: 'pinger', lvl: 1 },
                { id: 'smelting', lvl: 1 },
                { id: 'skilled', lvl: 3 },
                { id: 'magnet', lvl: 1 },
                { id: 'megabuldozing', lvl: 1 },
                { id: 'buldozing', lvl: 2 }
            ]
        }
    },
    {
        id: 'netherite_pickaxe_3',
        name: 'netherite_pickaxe',
        displayName: 'Кирка Крушителя xxx',
        searchKeyword: 'Кирка Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:efficiency', lvl: 10 },
                { id: 'minecraft:fortune', lvl: 5 },
                { id: 'minecraft:unbreaking', lvl: 5 }
            ],
            customEnchantments: [
                { id: 'web', lvl: 1 },
                { id: 'pinger', lvl: 1 },
                { id: 'smelting', lvl: 1 },
                { id: 'skilled', lvl: 3 },
                { id: 'magnet', lvl: 1 },
                { id: 'buldozing', lvl: 2 }
            ]
        }
    },
    {
        id: 'golden_pickaxe_1',
        name: 'golden_pickaxe',
        displayName: 'Божье касание',
        searchKeyword: 'Божье касание',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "Божье касание",
            customEnchantments: [
                { id: 'spawner', lvl: 1 },
            ]
        }
    },
    {
        id: 'golden_pickaxe_2',
        name: 'golden_pickaxe',
        displayName: 'Мощный удар',
        searchKeyword: 'Мощный удар',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "Мощный удар",
            customEnchantments: [
                { id: 'bedrock', lvl: 1 },
            ]
        }
    },
    {
        id: 'iron_nugget_1',
        name: 'iron_nugget',
        displayName: '[★] Серебро',
        searchKeyword: 'Серебро',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] Серебро'
        }
    },
    {
        id: 'dried_kelp_1',
        name: 'dried_kelp',
        displayName: '[★] Пласт',
        searchKeyword: 'Пласт',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] Пласт'
        }
    },
    {
        id: 'ender_eye_1',
        name: 'ender_eye',
        displayName: '[★] Дезориентация',
        searchKeyword: 'Дезориентация',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] Дезориентация'
        }
    },
    {
        id: 'sugar_1',
        name: 'sugar',
        displayName: '[★] Явная пыль',
        searchKeyword: 'Явная пыль',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] Явная пыль'
        }
    },
    {
        id: 'trident_crusher',
        name: 'trident',
        displayName: 'Трезубец Крушителя',
        searchKeyword: 'Трезубец Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:channeling', lvl: 1 },
                { id: 'minecraft:fire_aspect', lvl: 2 },
                { id: 'minecraft:impaling', lvl: 5 },
                { id: 'minecraft:loyalty', lvl: 3 },
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:sharpness', lvl: 7 },
                { id: 'minecraft:unbreaking', lvl: 5 }
            ],
            customEnchantments: [
                { id: 'detection', lvl: 3 },
                { id: 'returning', lvl: 1 },
                { id: 'demolishing', lvl: 1 },
                { id: 'stupor', lvl: 3 },
                { id: 'poison', lvl: 3 },
                { id: 'scout', lvl: 3 },
                { id: 'skilled', lvl: 3 },
                { id: 'pulling', lvl: 2 },
                { id: 'vampirism', lvl: 2 },
                { id: 'oxidation', lvl: 2 }
            ],
        }
    },
    {
        id: 'experience_bottle_1',
        name: 'experience_bottle',
        displayName: 'Пузырёк опыта (обычный)',
        searchKeyword: 'Пузырёк опыта',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            expLvlMissing: true
        }
    },
    {
        id: 'experience_bottle_2',
        name: 'experience_bottle',
        displayName: 'Пузырёк опыта [15lvl]',
        searchKeyword: 'Пузырёк опыта',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            expLvl: 15
        }
    },
    {
        "id": "chimera_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Химеры",
        "searchKeyword": "Сфера Химеры",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.attack_damage", "Amount": 3, "Slot": "offhand" },
                { "AttributeName": "generic.attack_speed", "Amount": 0.15, "Slot": "offhand" },
                { "AttributeName": "generic.max_health", "Amount": -2, "Slot": "offhand" }
            ]
        }
    },
    {
        "id": "titan_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Титана",
        "searchKeyword": "Сфера Титана",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.movement_speed", "Amount": -0.15, "Slot": "offhand" },
                { "AttributeName": "generic.armor", "Amount": 2, "Slot": "offhand" },
                { "AttributeName": "generic.armor_toughness", "Amount": 3, "Slot": "offhand" }
            ]
        }
    },
    {
        "id": "pandora_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Пандоры",
        "searchKeyword": "Сфера Пандоры",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.movement_speed", "Amount": 0.1, "Slot": "offhand" },
                { "AttributeName": "generic.armor", "Amount": -0.1, "Slot": "offhand" },
                { "AttributeName": "generic.attack_damage", "Amount": 0.25, "Slot": "offhand" }
            ]
        }
    },
    {
        "id": "osiris_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Осириса",
        "searchKeyword": "Сфера Осириса",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.knockback_resistance", "Amount": -0.15, "Slot": "offhand" },
                { "AttributeName": "generic.armor", "Amount": 2, "Slot": "offhand" },
                { "AttributeName": "generic.attack_knockback", "Amount": 0.15, "Slot": "offhand" }
            ]
        }
    },
    {
        "id": "astraea_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Астрея",
        "searchKeyword": "Сфера Астрея",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.max_health", "Amount": 4, "Slot": "offhand" },
                { "AttributeName": "generic.attack_speed", "Amount": -0.15, "Slot": "offhand" },
                { "AttributeName": "generic.attack_damage", "Amount": 3, "Slot": "offhand" }
            ]
        }
    },
    {
        "id": "apollo_sphere_3",
        "name": "player_head",
        "displayName": "Сфера Аполлона",
        "searchKeyword": "Сфера Аполлона",
        "absoluteMinUnitPrice": null,
        "previousAbsoluteMinUnitPrice": null,
        "buyPrice": null,
        "sellPrice": null,
        "lastUpdated": null,
        "requiredNbt": {
            "Enchantments": [
                { "id": "minecraft:vanishing_curse", "lvl": 1 }
            ],
            "AttributeModifiers": [
                { "AttributeName": "generic.movement_speed", "Amount": -0.1, "Slot": "offhand" },
                { "AttributeName": "generic.attack_damage", "Amount": 4, "Slot": "offhand" }
            ]
        }
    },
    {
        id: "andromeda_sphere_3",
        name: "player_head",
        displayName: "Сфера Андромеды",
        searchKeyword: "Сфера Андромеды",
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: "minecraft:vanishing_curse", lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: "generic.max_health", Amount: -4, Slot: "offhand" },
                { AttributeName: "generic.movement_speed", Amount: 0.15, Slot: "offhand" },
                { AttributeName: "generic.armor", Amount: 2, Slot: "offhand" },
                { AttributeName: "generic.attack_damage", Amount: 3, Slot: "offhand" }
            ]
        }
    },
    {
        id: 'totem_undying_3',
        name: 'totem_of_undying',
        displayName: 'Талисман Феникса',
        searchKeyword: 'Талисман Феникса',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.max_health', Amount: 6, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.1, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_6',
        name: 'totem_of_undying',
        displayName: 'Талисман Тритона',
        searchKeyword: 'Талисман Тритона',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.armor', Amount: +2, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: +2, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: -2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_7',
        name: 'totem_of_undying',
        displayName: 'Талисман Карателя',
        searchKeyword: 'Талисман Карателя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 7, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.1, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_10',
        name: 'totem_of_undying',
        displayName: 'Талисман Ехидны',
        searchKeyword: 'Талисман Ехидны',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 6, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: -2, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: -2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_13',
        name: 'totem_of_undying',
        displayName: 'Талисман Дедала',
        searchKeyword: 'Талисман Дедала',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 5, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_16',
        name: 'totem_of_undying',
        displayName: 'Талисман Грани',
        searchKeyword: 'Талисман Грани',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.15, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_19',
        name: 'totem_of_undying',
        displayName: 'Талисман Гармонии',
        searchKeyword: 'Талисман Гармонии',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_20',
        name: 'totem_of_undying',
        displayName: 'Талисман Крушителя',
        searchKeyword: 'Талисман Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:fire_protection', lvl: 1 }
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 4, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: 2, Slot: 'offhand' }
            ]
        }
    },
    {
        id: 'soul_lantern_1',
        name: 'soul_lantern',
        displayName: '[★] Проклятая Душа',
        searchKeyword: 'Проклятая Душа',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            loreContains: 'Оригинальный предмет',
            Enchantments: [
                { id: 'minecraft:flame', lvl: 1 }
            ]
        }
    },
    {
        id: 'netherite_scrap_1',
        name: 'netherite_scrap',
        displayName: '[★] Трапка',
        searchKeyword: 'Трапка',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] Трапка'
        }
    },
    {
        id: 'enchanted_golden_apple_1',
        name: 'enchanted_golden_apple',
        displayName: 'Enchanted Golden Apple',
        searchKeyword: 'Зачарованное золотое яблоко',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'diamond_1',
        name: 'diamond',
        displayName: 'Diamond',
        searchKeyword: 'Алмаз',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'netherite_leggings_1',
        name: 'netherite_leggings',
        displayName: 'Поножи Крушителя',
        searchKeyword: 'Поножи Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { lvl: 5, id: 'minecraft:blast_protection' },
                { lvl: 5, id: 'minecraft:fire_protection' },
                { lvl: 1, id: 'minecraft:mending' },
                { lvl: 5, id: 'minecraft:projectile_protection' },
                { lvl: 5, id: 'minecraft:protection' },
                { lvl: 5, id: 'minecraft:unbreaking' }
            ]
        }
    },
    {
        id: 'netherite_helmet_1',
        name: 'netherite_helmet',
        displayName: 'Шлем Крушителя',
        searchKeyword: 'Шлем Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { lvl: 1, id: 'minecraft:aqua_affinity' },
                { lvl: 5, id: 'minecraft:blast_protection' },
                { lvl: 5, id: 'minecraft:fire_protection' },
                { lvl: 1, id: 'minecraft:mending' },
                { lvl: 5, id: 'minecraft:projectile_protection' },
                { lvl: 5, id: 'minecraft:protection' },
                { lvl: 3, id: 'minecraft:respiration' },
                { lvl: 5, id: 'minecraft:unbreaking' }
            ]
        }
    },

    {
        id: 'netherite_chestplate_1',
        name: 'netherite_chestplate',
        displayName: 'Нагрудник Крушителя',
        searchKeyword: 'Нагрудник Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { lvl: 5, id: 'minecraft:blast_protection' },
                { lvl: 5, id: 'minecraft:fire_protection' },
                { lvl: 1, id: 'minecraft:mending' },
                { lvl: 5, id: 'minecraft:projectile_protection' },
                { lvl: 5, id: 'minecraft:protection' },
                { lvl: 5, id: 'minecraft:unbreaking' }
            ]
        }
    },

    {
        id: 'netherite_boots_1',
        name: 'netherite_boots',
        displayName: 'Ботинки Крушителя',
        searchKeyword: 'Ботинки Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { lvl: 5, id: 'minecraft:blast_protection' },
                { lvl: 3, id: 'minecraft:depth_strider' },
                { lvl: 4, id: 'minecraft:feather_falling' },
                { lvl: 5, id: 'minecraft:fire_protection' },
                { lvl: 1, id: 'minecraft:mending' },
                { lvl: 5, id: 'minecraft:projectile_protection' },
                { lvl: 5, id: 'minecraft:protection' },
                { lvl: 3, id: 'minecraft:soul_speed' },
                { lvl: 5, id: 'minecraft:unbreaking' }
            ]
        }
    }
];


function addTargetItem(item) {
    targetItems.push(item);
}


function removeTargetItemById(id) {
    const index = targetItems.findIndex(item => item.id === id);
    if (index !== -1) {
        targetItems.splice(index, 1);
    }
}


function removeTargetItem(name) {
    const index = targetItems.findIndex(item => item.name === name);
    if (index !== -1) {
        targetItems.splice(index, 1);
    }
}

module.exports = {
    targetItems,
    addTargetItem,
    removeTargetItem
};
