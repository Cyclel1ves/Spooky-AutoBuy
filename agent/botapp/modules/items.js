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
        id: 'tripwire_hook_5',
        name: 'tripwire_hook',
        displayName: 'Отмычка к сферам',
        searchKeyword: 'Отмычка к сферам',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "С Сферами"
        }
    },
    {
        id: 'tripwire_hook_4',
        name: 'tripwire_hook',
        displayName: 'Отмычка к оружию',
        searchKeyword: 'Отмычка к оружию',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "С Оружием"
        }
    },
    {
        id: 'tripwire_hook_3',
        name: 'tripwire_hook',
        displayName: 'Отмычка к инструментам',
        searchKeyword: 'Отмычка к инструментам',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "С Инструментами"
        }
    },
    {
        id: 'tripwire_hook_2',
        name: 'tripwire_hook',
        displayName: 'Отмычка к броне',
        searchKeyword: 'Отмычка к броне',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "С Броней"
        }
    },
    {
        id: 'tripwire_hook_1',
        name: 'tripwire_hook',
        displayName: 'Отмычка к ресурсам',
        searchKeyword: 'Отмычка к ресурсам',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            "loreContains": "С Ресурсами"
        }
    },
    {
        id: 'ancient_debris_1',
        name: 'ancient_debris',
        displayName: 'Древние обломки',
        searchKeyword: 'Древние обломки',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'popper_potion_1',
        name: 'splash_potion',
        displayName: 'Хлопушка',
        searchKeyword: 'Хлопушка',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 2, Amplifier: 9, Duration: 200 },
                { Id: 1, Amplifier: 4, Duration: 400 },
                { Id: 15, Amplifier: 9, Duration: 100 },
                { Id: 24, Amplifier: 0, Duration: 3600 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'holy_water_potion_1',
        name: 'splash_potion',
        displayName: 'Святая вода',
        searchKeyword: 'Святая вода',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 10, Amplifier: 2, Duration: 1200 },
                { Id: 14, Amplifier: 1, Duration: 12000 },
                { Id: 6, Amplifier: 1, Duration: 1 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'rage_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Гнева',
        searchKeyword: 'Зелье Гнева',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 5, Amplifier: 4, Duration: 600 },
                { Id: 2, Amplifier: 3, Duration: 600 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'paladin_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Палладина',
        searchKeyword: 'Зелье Палладина',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 11, Amplifier: 0, Duration: 12000 },
                { Id: 12, Amplifier: 0, Duration: 12000 },
                { Id: 21, Amplifier: 2, Duration: 1200 },
                { Id: 14, Amplifier: 2, Duration: 18000 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'assassin_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Ассасина',
        searchKeyword: 'Зелье Ассасина',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 5, Amplifier: 3, Duration: 1200 },
                { Id: 1, Amplifier: 2, Duration: 6000 },
                { Id: 3, Amplifier: 0, Duration: 1200 },
                { Id: 7, Amplifier: 1, Duration: 1 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'radiation_potion_1',
        name: 'splash_potion',
        displayName: 'Зелье Радиации',
        searchKeyword: 'Зелье Радиации',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 19, Amplifier: 1, Duration: 400 },
                { Id: 20, Amplifier: 1, Duration: 400 },
                { Id: 2, Amplifier: 2, Duration: 400 },
                { Id: 17, Amplifier: 4, Duration: 400 },
                { Id: 24, Amplifier: 0, Duration: 400 },
            ],
            exactPotionEffects: true
        }
    },
    {
        id: 'drowsiness_potion_1',
        name: 'splash_potion',
        displayName: 'Снотворное',
        searchKeyword: 'Снотворное',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            potionEffects: [
                { Id: 18, Amplifier: 1, Duration: 1800 },
                { Id: 4, Amplifier: 1, Duration: 200 },
                { Id: 20, Amplifier: 2, Duration: 1800 },
                { Id: 15, Amplifier: 0, Duration: 200 },
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
                { id: 'funmultiversion:glint_override', lvl: 1 },
                { id: 'minecraft:bane_of_arthropods', lvl: 7 },
                { id: 'minecraft:fire_aspect', lvl: 2 },
                { id: 'minecraft:looting', lvl: 5 },
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:sharpness', lvl: 7 },
                { id: 'minecraft:smite', lvl: 7 },
                { id: 'minecraft:sweeping', lvl: 3 },
                { id: 'minecraft:unbreaking', lvl: 5 }
            ],
            customEnchantments: [
                { id: 'oxidation', lvl: 2 },
                { id: 'detection', lvl: 3 },
                { id: 'poison', lvl: 3 },
                { id: 'vampirism', lvl: 2 },
                { id: 'skilled', lvl: 3 }
            ]
        }
    },

    {
        id: 'netherite_pickaxe_1',
        name: 'netherite_pickaxe',
        displayName: 'Молот Тора',
        searchKeyword: 'Молот Тора',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'funmultiversion:glint_override', lvl: 1 },
            ],
            customEnchantments: [
                { id: 'magnet', lvl: 1 },
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
                { id: 'funmultiversion:glint_override', lvl: 1 },
                { id: 'minecraft:efficiency', lvl: 10 },
                { id: 'minecraft:fortune', lvl: 5 },
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:unbreaking', lvl: 5 },
            ],
            customEnchantments: [
                { id: 'skilled', lvl: 3 },
                { id: 'smelting', lvl: 1 },
                { id: 'magnet', lvl: 1 },
                { id: 'pinger', lvl: 1 },
                { id: 'web', lvl: 1 },
                { id: 'buldozing', lvl: 2 },
            ]
        }
    },
    {
        id: 'netherite_pickaxe_3',
        name: 'netherite_pickaxe',
        displayName: 'Кирка Сатаны',
        searchKeyword: 'Кирка Сатаны',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'funmultiversion:glint_override', lvl: 1 },
                { id: 'minecraft:efficiency', lvl: 7 },
                { id: 'minecraft:fortune', lvl: 4 },
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:unbreaking', lvl: 4 },
            ],
            customEnchantments: [
                { id: 'smelting', lvl: 1 },
                { id: 'magnet', lvl: 1 },
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
            Enchantments: [
                { id: 'funmultiversion:glint_override', lvl: 1 },
            ],
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
            Enchantments: [
                { id: 'funmultiversion:glint_override', lvl: 1 },
            ],
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
        id: 'crossbow_1',
        name: 'crossbow',
        displayName: 'Арбалет Крушителя',
        searchKeyword: 'Арбалет Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            exactEnchantments: true,
            Enchantments: [
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:multishot', lvl: 1 },
                { id: 'minecraft:piercing', lvl: 5 },
                { id: 'minecraft:quick_charge', lvl: 3 },
                { id: 'minecraft:unbreaking', lvl: 3 }
            ]
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
        displayName: '[★] Пузырёк опыта [15 Ур.]',
        searchKeyword: 'Опыт с уровнем',
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
        id: 'haosa_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Хаоса',
        searchKeyword: 'Сфера Хаоса',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.attack_damage', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.07, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.13, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'satira_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Сатира',
        searchKeyword: 'Сфера Сатира',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.15, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'bestia_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Бестии',
        searchKeyword: 'Сфера Бестии',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.armor', Amount: 1, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 4, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.1, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.1, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'aresa_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Ареса',
        searchKeyword: 'Сфера Ареса',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 6, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: -2, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'gidra_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Гидры',
        searchKeyword: 'Сфера Гидры',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:aqua_affinity', lvl: 1 },
                { id: 'minecraft:respiration', lvl: 3 },
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.max_health', Amount: 4, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'ikara_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Икара',
        searchKeyword: 'Сфера Икара',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'erida_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Эрида',
        searchKeyword: 'Сфера Эрида',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.luck', Amount: 1, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'moroza_sphere_3',
        name: 'player_head',
        displayName: '[❄] Сфера Мороза',
        searchKeyword: 'Сфера Мороза',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:aqua_affinity', lvl: 1 },
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.knockback_resistance', Amount: 0.5, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: -0.1, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: -0.15, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'titana_sphere_3',
        name: 'player_head',
        displayName: '[★] Сфера Титана',
        searchKeyword: 'Сфера Титана',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:vanishing_curse', lvl: 1 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.armor', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: -0.15, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_20',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Крушителя',
        searchKeyword: 'Талисман Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.max_health', Amount: 4, Slot: 'offhand' },
                { AttributeName: 'generic.attack_damage', Amount: 3, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_25',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Раздора',
        searchKeyword: 'Талисман Раздора',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 4, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.1, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.1, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: -3, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_26',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Тирана',
        searchKeyword: 'Талисман Тирана',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.armor', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_27',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Ярости',
        searchKeyword: 'Талисман Ярости',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 5, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_21',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Вихря',
        searchKeyword: 'Талисман Вихря',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.max_health', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.15, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.15, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_24',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Мрака',
        searchKeyword: 'Талисман Мрака',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.armor', Amount: 1.5, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: 1.5, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_23',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Демона',
        searchKeyword: 'Талисман Демона',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 2.5, Slot: 'offhand' },
                { AttributeName: 'generic.attack_speed', Amount: 0.1, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_28',
        name: 'totem_of_undying',
        displayName: '[❄] Талисман Гринча',
        searchKeyword: 'Талисман Гринча',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.luck', Amount: 2, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.1, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.armor_toughness', Amount: -2, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'totem_undying_29',
        name: 'totem_of_undying',
        displayName: '[★] Талисман Карателя',
        searchKeyword: 'Талисман Карателя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            Enchantments: [
                { id: 'minecraft:unbreaking', lvl: 3 },
            ],
            AttributeModifiers: [
                { AttributeName: 'generic.attack_damage', Amount: 7, Slot: 'offhand' },
                { AttributeName: 'generic.max_health', Amount: -4, Slot: 'offhand' },
                { AttributeName: 'generic.movement_speed', Amount: 0.1, Slot: 'offhand' },
            ]
        }
    },
    {
        id: 'soul_lantern_1',
        name: 'soul_lantern',
        displayName: '[★] Проклятая душа',
        searchKeyword: 'Проклятая душа',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            loreContains: 'Собирателя душ',
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
        id: 'phantom_membrane_1',
        name: 'phantom_membrane',
        displayName: '[★] Божья аура',
        searchKeyword: 'Божья аура',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            loreContains: 'Божественная аура'
        }
    },
    {
        id: 'fire_charge_1',
        name: 'fire_charge',
        displayName: '[★] Огненный смерч',
        searchKeyword: 'Огненный смерч',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            loreContains: 'Огненная волна'
        }
    },
    {
        id: 'enchanted_golden_apple_1',
        name: 'enchanted_golden_apple',
        displayName: 'Зачарованное золотое яблоко',
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
    },
    {
        id: 'ender_pearl_1',
        name: 'ender_pearl',
        displayName: 'Эндер-жемчуг',
        searchKeyword: 'Эндер-жемчуг',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'golden_carrot_1',
        name: 'golden_carrot',
        displayName: 'Золотая морковь',
        searchKeyword: 'Золотая морковь',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'chorus_fruit_1',
        name: 'chorus_fruit',
        displayName: 'Плод хоруса',
        searchKeyword: 'Плод хоруса',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'netherite_ingot_1',
        name: 'netherite_ingot',
        displayName: 'Незеритовый слиток',
        searchKeyword: 'Незеритовый слиток',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'totem_of_undying_1',
        name: 'totem_of_undying',
        displayName: 'Тотем бессмертия',
        searchKeyword: 'Тотем бессмертия',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'tnt_1',
        name: 'tnt',
        displayName: '[★] TNT - TIER WHITE',
        searchKeyword: 'Таер вайт',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] TNT - TIER WHITE'
        }
    },
    {
        id: 'blaze_rod_1',
        name: 'blaze_rod',
        displayName: 'Палка ифрита',
        searchKeyword: 'Палка ифрита',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'elytra_1',
        name: 'elytra',
        displayName: 'Элитры Крушителя',
        searchKeyword: 'Элитры Крушителя',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: 'Элитры Крушителя',
            exactEnchantments: true,
            Enchantments: [
                { id: 'minecraft:mending', lvl: 1 },
                { id: 'minecraft:unbreaking', lvl: 5 }
            ]
        }
    },
    {
        id: 'tnt_2',
        name: 'tnt',
        displayName: '[★] TNT - TIER BLACK',
        searchKeyword: 'Таер блэк',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            displayName: '[★] TNT - TIER BLACK'
        }
    },
    {
        id: 'golden_apple_1',
        name: 'golden_apple',
        displayName: 'Золотое яблоко',
        searchKeyword: 'Золотое яблоко',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null
    },
    {
        id: 'snowball_1',
        name: 'snowball',
        displayName: '[★] Снежок заморозка',
        searchKeyword: 'Снежок заморозка',
        absoluteMinUnitPrice: null,
        previousAbsoluteMinUnitPrice: null,
        buyPrice: null,
        sellPrice: null,
        lastUpdated: null,
        requiredNbt: {
            loreContains: 'Ледяная сфера'
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
