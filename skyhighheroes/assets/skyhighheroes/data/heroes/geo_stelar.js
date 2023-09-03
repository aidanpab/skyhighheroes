var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
var bodyTemp = implement("skyhighheroes:external/body_temperature");
function init(hero) {
  hero.setName("Geo Stelar");
  hero.setTier(10);
  hero.setChestplate("Transer");
  hero.setAliases("geo_stelar");
  hero.setVersion("Mega Man Star Force");
  hero.addPrimaryEquipment("fiskheroes:katana{Dual:1,display:{Name:\u00A7bGeo Stelar's Katanas},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Dual"));
  hero.addPrimaryEquipment("fiskheroes:ruptures_scythe{display:{Name:\u00A7bGeo Stelar's Scythe},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:chronos_rifle{display:{Name:\u00A7bGeo Stelar's Rifle},ench:[{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1,display:{Name:\u00A7bGeo Stelar's Shield},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Electromagnetic"));
  
  hero.addPowers("skyhighheroes:em_wave_change", "skyhighheroes:em_wave_being", "skyhighheroes:em_battle_card_predation", "skyhighheroes:em_mega_buster");
  hero.addAttribute("SPRINT_SPEED", 0.2, 1);
  hero.addAttribute("STEP_HEIGHT", 0.5, 0);
  hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
  hero.addAttribute("PUNCH_DAMAGE", 9.5, 0);
  //hero.addAttribute("REACH_DISTANCE", -1.0, 0);
  hero.addAttribute("KNOCKBACK", 2.5, 0);
  hero.addAttribute("IMPACT_DAMAGE", 50.0, 0);
  hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

  hero.addKeyBind("TELEPORT", "Transmit", 1);
  hero.addKeyBindFunc("CYCLE_CLOTHES", cycleClothes, "Cycle Clothes", 1);
  hero.addKeyBindFunc("CYCLE_UP_CARD", cycleUpCard, "Next Battle Card", 1);
  hero.addKeyBindFunc("VISUALIZER_TOGGLE", visualizerToggle, "Toggle Visualizer", 2);
  hero.addKeyBindFunc("BATTLE_CARD_0", activateBattleCard, "Return To Mega Buster", 2);
  hero.addKeyBindFunc("BATTLE_CARD_1", activateBattleCard, "Shield", 2);
  hero.addKeyBindFunc("BATTLE_CARD_2", activateBattleCard, "Sword", 2);
  hero.addKeyBindFunc("BATTLE_CARD_3", activateBattleCard, "Shurikens", 2);
  hero.addKeyBindFunc("BATTLE_CARD_RESET_PREDATION", resetBattleCard, "Return To Mega Buster", 2);
  hero.addKeyBind("PREDATION", "Battle Card Predation", 2);
  hero.addKeyBind("INVISIBILITY", "Become Wave", 3);
  hero.addKeyBindFunc("CYCLE_DOWN_CARD", cycleDownCard, "Previous Battle Card", 3);
  hero.addKeyBindFunc("HOOD_TOGGLE", hoodToggle, "Toggle Hood", 3);
  hero.addKeyBind("AIM", "Aim Mega Buster", 4);
  hero.addKeyBind("SHIELD_THROW", "Throw Shield", 4);
  hero.addKeyBind("CHARGE_ENERGY", "Charge Energy", 4);
  hero.addKeyBindFunc("WAVE_CHANGE", electroMagnetic, "EM Wave Change", 5);
  hero.addKeyBind("WAVE_CHANGE", "EM Wave Change", 5);
  hero.addKeyBindFunc("BATTLE_CARD_RESET", resetBattleCard, "Return To Mega Buster", 5);
  hero.addKeyBind("OMEGA_XIS_TOGGLE", "Toggle Omega-Xis Head", 5);
  hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);
  
  hero.setDefaultScale(1.0);
  hero.setHasProperty(hasProperty);
  hero.setHasPermission(hasPermission);
  hero.addAttributeProfile("INACTIVE", inactiveProfile);
  hero.addAttributeProfile("BLADE", bladeProfile);
  hero.addAttributeProfile("SHIELD", shieldProfile);
  hero.addAttributeProfile("FROZEN", frozenProfile);
  hero.addAttributeProfile("COLD3", cold3Profile);
  hero.addAttributeProfile("COLD2", cold2Profile);
  hero.addAttributeProfile("COLD1", cold1Profile);
  hero.addAttributeProfile("HOT1", hot1Profile);
  hero.addAttributeProfile("HOT2", hot2Profile);
  hero.addAttributeProfile("HOT3", hot3Profile);
  hero.addAttributeProfile("FIRE", fireProfile);
  hero.setAttributeProfile(getAttributeProfile);
  hero.supplyFunction("canAim", canAim);
  hero.setModifierEnabled(isModifierEnabled);
  hero.setTierOverride(getTierOverride);
  hero.setKeyBindEnabled(isKeyBindEnabled);
  hero.setDamageProfile(getDamageProfile);
  hero.setTickHandler((entity, manager) => {
    var x = entity.posX();
    var y = entity.posY();
    var z = entity.posZ();
    if (entity.world().getDimension() == 0 && entity.posY() > 4000 && entity.rotPitch() < -80 && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, 2595));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    if (entity.world().getDimension() == 2595 && entity.posY() > 4000 && entity.rotPitch() < -80 && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, 0));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    var t = entity.getData("skyhighheroes:dyn/superhero_boosting_landing_ticks");
    if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && entity.world().blockAt(entity.pos()).name() == "minecraft:air") {
      manager.setDataWithNotify(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", t = 12);
      entity.playSound("skyhighheroes:wave.footstep", 1, 1.15 - Math.random() * 0.3);
    } else if (t > 0) {
      manager.setData(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", --t);
    };
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_boosting_landing_timer", 2, 8, t > 0);
    var pain = (entity.rotPitch() > 12.5 && entity.motionY() < -0.075 && entity.motionY() > -1.25 && (entity.motionZ() > 0.125 || entity.motionZ() < -0.125 || entity.motionX() > 0.125 || entity.motionX() < -0.125)) && !entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:flight_timer") > 0 && (entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -3, 0)).isSolid()) && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.world().blockAt(entity.pos()).name() == "minecraft:air";
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_landing_timer", 10, 10, pain);
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.motionY() < -0.05 && !entity.isSneaking() && !entity.isOnGround() && (!entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.getData("fiskheroes:intangible"))) {
      manager.setData(entity, "fiskheroes:flying", true);
    };
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getData("fiskheroes:aiming") || entity.getData("fiskheroes:flight_boost_timer") > 0 || !entity.getHeldItem().isEmpty() || (entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") > 0 && entity.getData("skyhighheroes:dyn/predation_timer") < 1))) {
      manager.setData(entity, "skyhighheroes:dyn/battle_card", 0);
      manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
      manager.incrementData(entity, "skyhighheroes:dyn/sword_timer", 10, false);
      manager.setData(entity, "skyhighheroes:dyn/omega_xis", false);
    };
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getData("fiskheroes:aiming") || entity.getData("fiskheroes:flight_boost_timer") > 0 || (entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") > 0 && entity.getData("skyhighheroes:dyn/predation_timer") < 1))) {
      manager.setData(entity, "skyhighheroes:dyn/omega_xis", false);
    };
    var item_holding = (!entity.getHeldItem().isEmpty());
    manager.incrementData(entity, "skyhighheroes:dyn/item_holding_timer", 10, item_holding);
    var sword = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") < 0.35 && entity.getData("skyhighheroes:dyn/battle_card") == 2);
    manager.incrementData(entity, "skyhighheroes:dyn/sword_timer", 10, sword);
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") > 0.45 && entity.getData("skyhighheroes:dyn/predation_timer") < 0.55) {
      if (entity.getData("skyhighheroes:dyn/battle_card") == 1) {
        entity.playSound("skyhighheroes:wave.equip", 1, 1);
        manager.setData(entity, "skyhighheroes:dyn/omega_xis", false);
        manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        manager.setData(entity, "fiskheroes:shield", true);
      }
      if (entity.getData("skyhighheroes:dyn/battle_card") == 2) {
        entity.playSound("skyhighheroes:wave.equip", 1, 1);
        manager.setData(entity, "skyhighheroes:dyn/omega_xis", true);
        manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        manager.setData(entity, "fiskheroes:blade", true);
      }
      if (entity.getData("skyhighheroes:dyn/battle_card") == 3) {
        entity.playSound("skyhighheroes:wave.equip", 1, 1);
        manager.setData(entity, "skyhighheroes:dyn/omega_xis", true);
        manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        manager.setData(entity, "fiskheroes:utility_belt_type", 1);
      }
    };
    bodyTemp.change(entity, manager, [
      { clothingType: 0, biome: "Cold Taiga", tempChangeTicks: -5000.0 },
      { clothingType: 0, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 0, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 0, biome: "Beach", tempChangeTicks: 10000.0 },
      { clothingType: 0, biome: "Desert", tempChangeTicks: 400.0 },
      { clothingType: 0, biome: "Hell", tempChangeTicks: 100.0 },
      { clothingType: 0, biome: "Jungle", tempChangeTicks: 500.0 },
      { clothingType: 0, biome: "Mesa", tempChangeTicks: 1000.0 },
      { clothingType: 0, biome: "Savanna", tempChangeTicks: 2000.0 },
      { clothingType: 0, biome: "Swampland", tempChangeTicks: 1000.0 },
      { clothingType: 1, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 1, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 1, biome: "Cold Taiga", tempChangeTicks: -2000.0 },
      { clothingType: 1, biome: "Cold Beach", tempChangeTicks: -3000.0 },
      { clothingType: 1, biome: "Extreme", tempChangeTicks: -4000.0 },
      { clothingType: 1, biome: "Mega", tempChangeTicks: -5000.0 },
      { clothingType: 1, biome: "Stone Beach", tempChangeTicks: -3000.0 },
      { clothingType: 2, biome: "Ice", tempChangeTicks: -300.0 },
      { clothingType: 2, biome: "Frozen", tempChangeTicks: -300.0 },
      { clothingType: 2, biome: "Cold Taiga", tempChangeTicks: -500.0 },
      { clothingType: 2, biome: "Cold Beach", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Extreme", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Mega", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Stone", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Birch", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Flower", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Forest", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Mesa", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Plains", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Roofed", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Sunflower", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Taiga", tempChangeTicks: -2500.0 },
      { clothingType: 3, biome: "River", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Sunflower", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Stone", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Roofed", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Plains", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Forest", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Flower", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Birch", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Mushroom", tempChangeTicks: 2000.0 },
      { clothingType: 3, biome: "Savanna", tempChangeTicks: 1000.0 },
      { clothingType: 3, biome: "Beach", tempChangeTicks: 800.0 },
      { clothingType: 3, biome: "Mesa", tempChangeTicks: 500.0 },
      { clothingType: 3, biome: "Jungle", tempChangeTicks: 160.0 },
      { clothingType: 3, biome: "Swampland", tempChangeTicks: 160.0 },
      { clothingType: 3, biome: "Hell", tempChangeTicks: 80.0 },
      { clothingType: 3, biome: "Desert", tempChangeTicks: 100.0 },
      { clothingType: 4, biome: "Cold Taiga", tempChangeTicks: -5000.0 },
      { clothingType: 4, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 4, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 4, biome: "Beach", tempChangeTicks: 10000.0 },
      { clothingType: 4, biome: "Desert", tempChangeTicks: 400.0 },
      { clothingType: 4, biome: "Hell", tempChangeTicks: 100.0 },
      { clothingType: 4, biome: "Jungle", tempChangeTicks: 500.0 },
      { clothingType: 4, biome: "Mesa", tempChangeTicks: 1000.0 },
      { clothingType: 4, biome: "Savanna", tempChangeTicks: 2000.0 },
      { clothingType: 4, biome: "Swampland", tempChangeTicks: 1000.0 }
      ], "skyhighheroes:dyn/body_temperature", 400.0, "skyhighheroes:dyn/stelar_clothes");
  });
  hero.addSoundEvent("WEAPON_EQUIP", "skyhighheroes:wave_equip");
  hero.addSoundEvent("WEAPON_UNEQUIP", "skyhighheroes:wave_equip");
  hero.addSoundEvent("STEP", "skyhighheroes:wave_footstep");
  hero.addSoundEvent("PUNCH", "skyhighheroes:wave_punch");
  hero.addDamageProfile("BLADE", {
    "types": {
      "SHARP": 0.0,
      "WAVE_SHARP": 1.0
    }
  });
  hero.addDamageProfile("MAIN", {
    "types": {
      "BLUNT": 0.0,
      "WAVE_BLUNT": 1.0
    }
  });
}


//Normal Profiles
function shieldProfile(profile) {
  profile.inheritDefaults();
  profile.addAttribute("BASE_SPEED", -0.75, 1);
  profile.addAttribute("SPRINT_SPEED", 0.0, 0);
  profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
  profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
  profile.addAttribute("STEP_HEIGHT", -1.0, 1);
  profile.addAttribute("KNOCKBACK", 0.0, 0);
  profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
}
function bladeProfile(profile) {
  profile.inheritDefaults();
  profile.addAttribute("SPRINT_SPEED", 0.5, 1);
  profile.addAttribute("KNOCKBACK", 5.0, 0);
  profile.addAttribute("PUNCH_DAMAGE", 14.5, 0);
}
function inactiveProfile(profile) {
  //profile.addAttribute("MAX_HEALTH", -8.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};

//Temperature Profiles
function frozenProfile(profile) {
  profile.addAttribute("BASE_SPEED", -1.0, 1);
  profile.addAttribute("SPRINT_SPEED", -1.0, 1);
  profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
  profile.addAttribute("JUMP_HEIGHT", -2.0, 1);
  profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
  profile.addAttribute("MAX_HEALTH", -19.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 1);
};
function cold3Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.7, 1);
  profile.addAttribute("SPRINT_SPEED", -0.8, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.9, 1);
  profile.addAttribute("JUMP_HEIGHT", -1.0, 0);
  profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
  profile.addAttribute("MAX_HEALTH", -13.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function cold2Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.35, 1);
  profile.addAttribute("SPRINT_SPEED", -0.35, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.5, 1);
  profile.addAttribute("JUMP_HEIGHT", -0.25, 0);
  profile.addAttribute("MAX_HEALTH", -7.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function cold1Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.05, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.05, 1);
  profile.addAttribute("PUNCH_DAMAGE", -0.05, 1);
  profile.addAttribute("MAX_HEALTH", -2.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function hot1Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.1, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.05, 1);
  profile.addAttribute("PUNCH_DAMAGE", -0.05, 1);
  profile.addAttribute("MAX_HEALTH", -2.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function hot2Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.35, 1);
  profile.addAttribute("SPRINT_SPEED", -0.35, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.6, 1);
  profile.addAttribute("JUMP_HEIGHT", -0.5, 0);
  profile.addAttribute("MAX_HEALTH", -7.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function hot3Profile(profile) {
  profile.addAttribute("BASE_SPEED", -0.7, 1);
  profile.addAttribute("SPRINT_SPEED", -0.7, 1);
  profile.addAttribute("WEAPON_DAMAGE", -0.95, 1);
  profile.addAttribute("JUMP_HEIGHT", -1.0, 0);
  profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
  profile.addAttribute("MAX_HEALTH", -14.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};
function fireProfile(profile) {
  profile.addAttribute("BASE_SPEED", -1.0, 1);
  profile.addAttribute("SPRINT_SPEED", -1.0, 1);
  profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
  profile.addAttribute("JUMP_HEIGHT", -2.0, 1);
  profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
  profile.addAttribute("MAX_HEALTH", -19.0, 0);
  //profile.addAttribute("REACH_DISTANCE", -1.0, 0);
};

function getTierOverride(entity) {
  if ((entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0) && (entity.getData("skyhighheroes:dyn/wave_changing_timer") < 1)) {
    return 1;
  }
  return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1.0) ? 10 : 0;
}

function cycleUpCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") + 1);
  if (player.getData("skyhighheroes:dyn/selected_battle_card") > 3) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
  }
  return true;
}

function cycleDownCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") - 1);
  if (player.getData("skyhighheroes:dyn/selected_battle_card") < 0) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 3);
  }
  return true;
}

function activateBattleCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
  return true;
}

function resetBattleCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
  manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
  return true;
};

function electroMagnetic(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
  manager.setData(player, "skyhighheroes:dyn/visualizer_toggle", 0);
  manager.setData(player, "skyhighheroes:dyn/hood_toggle", 0);
  manager.setData(player, "skyhighheroes:dyn/body_temperature", 0.0);
  manager.setData(player, "skyhighheroes:dyn/predation_timer", 0);
  manager.setData(player, "skyhighheroes:dyn/predation", false);
  manager.setData(player, "skyhighheroes:dyn/omega_xis_timer", 0);
  manager.setData(player, "skyhighheroes:dyn/omega_xis", false);
  if (player.getData("skyhighheroes:dyn/wave_changed") == false) {
    manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
  }
  if (player.getData("skyhighheroes:dyn/wave_changed") == true) {
    manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
  }
  return true;
}

function visualizerToggle(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/visualizer_toggle", player.getData("skyhighheroes:dyn/visualizer_toggle") + 1);
  if (player.getData("skyhighheroes:dyn/visualizer_toggle") > 1) {
    manager.setData(player, "skyhighheroes:dyn/visualizer_toggle", 0);
  }
  if (player.getData("skyhighheroes:dyn/visualizer_toggle") == 1) {
    manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
  }
  if (player.getData("skyhighheroes:dyn/visualizer_toggle") == 0) {
    manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
  }
  return true;
}

function cycleClothes(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/stelar_clothes", player.getData("skyhighheroes:dyn/stelar_clothes") + 1);
  if (player.getData("skyhighheroes:dyn/stelar_clothes") > 4) {
    manager.setData(player, "skyhighheroes:dyn/stelar_clothes", 0);
  }
  return true;
}

function hoodToggle(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/hood_toggle", player.getData("skyhighheroes:dyn/hood_toggle") + 1);
  if (player.getData("skyhighheroes:dyn/hood_toggle") > 1) {
    manager.setData(player, "skyhighheroes:dyn/hood_toggle", 0);
  }
  return true;
}

function getAttributeProfile(entity) {
  if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0) {
    if (entity.getData("skyhighheroes:dyn/body_temperature") >= -1.3 && entity.getData("skyhighheroes:dyn/body_temperature") < -0.95 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "FROZEN";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") >= -0.95 && entity.getData("skyhighheroes:dyn/body_temperature") < -0.85 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "COLD3";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") >= -0.85 && entity.getData("skyhighheroes:dyn/body_temperature") < -0.5 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "COLD2";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") >= -0.5 && entity.getData("skyhighheroes:dyn/body_temperature") < -0.01 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "COLD1";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") == 0 || (entity.getData("skyhighheroes:dyn/body_temperature") >= -0.01 && entity.getData("skyhighheroes:dyn/body_temperature") <= 0.01) || (entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "INACTIVE";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") <= 0.55 && entity.getData("skyhighheroes:dyn/body_temperature") > 0.01 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "HOT1";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") <= 0.9 && entity.getData("skyhighheroes:dyn/body_temperature") > 0.55 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "HOT2";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") <= 0.95 && entity.getData("skyhighheroes:dyn/body_temperature") > 0.9 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "HOT3";
    }
    if (entity.getData("skyhighheroes:dyn/body_temperature") <= 1.3 && entity.getData("skyhighheroes:dyn/body_temperature") > 0.95 && !(entity.getData("skyhighheroes:dyn/stelar_clothes") == 2 && entity.isInWater())) {
      return "FIRE";
    }
  }
  if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    if (entity.getData("fiskheroes:shield_blocking")) {
      return "SHIELD";
    }
    if (entity.getData("fiskheroes:blade")) {
      return "BLADE";
    }
    if (!entity.getData("fiskheroes:blade") && !entity.getData("fiskheroes:shield_blocking")) {
      return null;
    }
  }
}

function getDamageProfile(entity) {
  if (entity.getData("fiskheroes:blade") && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    return "BLADE";
  }
  if (entity.getHeldItem().name() == "fiskheroes:katana" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    return "BLADE";
  }
  if (entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    return "BLADE";
  }
  if (entity.getHeldItem().name() == "fiskheroes:chronos_rifle" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    return "MAIN";
  }
  if (entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
    return "MAIN";
  }
  return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) ? "MAIN" : null;
}

function isModifierEnabled(entity, modifier) {
  switch (modifier.name()) {
    case "fiskheroes:damage_immunity":
      switch (modifier.id()) {
        case "explosion":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "magic":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "shuriken":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "sharp":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "bullet":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "blunt":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        case "fire":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "cactus":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "cold":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "energy":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "electricity":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "sound":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "thorns":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "radiation":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "water":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "hulk":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "holy":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "hellfire":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "mineral":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "shockwave":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "atlantean_steel":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "eternium":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "cosmic":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "kryptonite":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "light":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "cs":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "force":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "jv":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "primordial":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        default:
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
    }
    case "fiskheroes:controlled_flight":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      /*switch (modifier.id()) {
        case "base":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") != 4;
        case "creetle":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1  && entity.getData("skyhighheroes:dyn/battle_card") == 4;
    }*/
    case "fiskheroes:transformation":
      switch (modifier.id()) {
        case "wave_change":
          return entity.isAlive();
        case "omega_xis":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        case "predation":
          return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty();
    };
    case "fiskheroes:equipment":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 3 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
    case "fiskheroes:blade":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
    case "fiskheroes:shield":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 1 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
    case "fiskheroes:arrow_catching":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:shield_blocking") && !entity.getData("fiskheroes:blade") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("fiskheroes:utility_belt_type") < 0;
    case "fiskheroes:energy_bolt":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty();
    case "fiskheroes:lightning_cast":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:shield_blocking") && !entity.getData("fiskheroes:blade") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("fiskheroes:utility_belt_type") < 0 && entity.getHeldItem().isEmpty() && entity.getData("skyhighheroes:dyn/omega_xis") == 0;
    default:
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
  }
};


function isKeyBindEnabled(entity, keyBind) {
  switch (keyBind) {
    case "WAVE_CHANGE":
      return entity.isAlive() && entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/body_temperature") < 0.25 && entity.getData("skyhighheroes:dyn/body_temperature") > -0.25));
    case "VISUALIZER_TOGGLE":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0;
    case "CYCLE_CLOTHES":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && !entity.isSneaking();
    case "HOOD_TOGGLE":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/stelar_clothes") == 3;
    case "INTANGIBILITY":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") > 0;
    case "SHIELD_THROW":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:captain_americas_shield";
    case "CHARGE_ENERGY":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:ruptures_scythe";
    case "TELEPORT":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") < 0.5;
    case "INVISIBILITY":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") < 0.5;
    case "CYCLE_UP_CARD":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5;
    case "CYCLE_DOWN_CARD":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5;
    case "BATTLE_CARD_RESET_PREDATION":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.isSneaking() && (entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && entity.getData("skyhighheroes:dyn/selected_battle_card") > 0);
    case "BATTLE_CARD_RESET":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") > 0;
    case "BATTLE_CARD_0":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && entity.getData("skyhighheroes:dyn/selected_battle_card") == 0;
    case "BATTLE_CARD_1":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 1;
    case "BATTLE_CARD_2":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 2;
    case "BATTLE_CARD_3":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 3;
    //case "BATTLE_CARD_4":
      //return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation_timer") >= 0.5 && entity.getData("skyhighheroes:dyn/selected_battle_card") == 4;
    case "AIM":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getHeldItem().name() != "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() != "fiskheroes:ruptures_scythe");
    case "OMEGA_XIS_TOGGLE":
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0;
    default:
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
  }
};

function hasProperty(entity, property) {
  return property == "BREATHE_SPACE" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
}

function hasPermission(entity, permission) {
  return (permission == "USE_CHRONOS_RIFLE" || permission == "USE_SHIELD") && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
}

function canAim(entity) {
  return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
}