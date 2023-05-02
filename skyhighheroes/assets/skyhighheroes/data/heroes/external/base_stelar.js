function init(hero) {
    hero.setTier(10);
    hero.setChestplate("Transer");
    hero.setVersion("Mega Man Star Force");
    hero.hide();
    hero.addPrimaryEquipment("fiskheroes:katana{Dual:1}", true, item => item.nbt().getBoolean("Dual"));
    hero.addPrimaryEquipment("fiskheroes:ruptures_scythe", true);
    hero.addPrimaryEquipment("fiskheroes:chronos_rifle", true);
    hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1}", true, item => item.nbt().getBoolean("Electromagnetic"));
    
    hero.addPowers("skyhighheroes:em_wave_change", "skyhighheroes:em_wave_being", "skyhighheroes:em_battle_card_predation", "skyhighheroes:em_mega_buster");
    hero.addAttribute("SPRINT_SPEED", 0.2, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 9.5, 0);
    hero.addAttribute("MAX_HEALTH", -8.0, 0);
    hero.addAttribute("REACH_DISTANCE", -1.0, 0);
    hero.addAttribute("KNOCKBACK", 2.5, 0);
    hero.addAttribute("IMPACT_DAMAGE", 50.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

    hero.addKeyBind("TELEPORT", "Transmit", 1);
  hero.addKeyBindFunc("func_CYCLE_CLOTHES", cycleClothes, "Cycle Clothes", 1);
  hero.addKeyBindFunc("func_CYCLE_UP_CARD", cycleUpCard, "Next Battle Card", 1);
  hero.addKeyBindFunc("func_VISUALIZER_TOGGLE", visualizerToggle, "Toggle Visualizer", 2);
  hero.addKeyBindFunc("func_BATTLE_CARD_0", activateCard0, "Return To Mega Buster", 2);
  hero.addKeyBindFunc("func_BATTLE_CARD_1", activateCard1, "Choose Shield", 2);
  hero.addKeyBindFunc("func_BATTLE_CARD_2", activateCard2, "Choose Blade", 2);
  hero.addKeyBindFunc("func_BATTLE_CARD_3", activateCard3, "Choose Shurikens", 2);
  hero.addKeyBind("PREDATION", "Battle Card Predation", 2);
  hero.addKeyBind("INVISIBILITY", "Become Wave", 3);
  hero.addKeyBindFunc("func_CYCLE_DOWN_CARD", cycleDownCard, "Previous Battle Card", 3);
  hero.addKeyBind("AIM", "Aim Mega Buster", 4);
  hero.addKeyBind("SHIELD_THROW", "Throw Shield", 4);
  hero.addKeyBind("CHARGE_ENERGY", "Charge Energy", 4);
  hero.addKeyBindFunc("func_ELECTROMAGNETIC", electroMagnetic, "EM Wave Change", 5);
  hero.addKeyBind("WAVE_CHANGE", "EM Wave Change", 5);
  hero.addKeyBindFunc("func_HEADTOGGLE", headToggle, "Toggle Omega-Xis Head", 5);
  hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);
    
    hero.setDefaultScale(1.0);
    hero.setHasProperty(hasProperty);
    hero.setHasPermission(hasPermission);
    hero.addAttributeProfile("INACTIVE", inactiveProfile);
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("SHIELD", shieldProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTierOverride(getTierOverride);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDamageProfile(getDamageProfile);
    hero.setTickHandler((entity, manager) => {
      if (entity.getData('skyhighheroes:dyn/wave_changing_timer') == 1 && ((!entity.getHeldItem().isEmpty() && entity.getData('skyhighheroes:dyn/battle_card') == 2) || entity.getData('fiskheroes:flying') || entity.getData('fiskheroes:aiming'))){
        manager.setData(entity, "skyhighheroes:dyn/battle_card", 0);
      };
    });
    hero.addDamageProfile("MAIN", {
      "types": {
          "ELECTRICITY": 1.0,
          "ENERGY": 1.0,
          "BLUNT": 1.0,
          "WAVE_BLUNT": 1.0
      }
  });
}



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

function getTierOverride(entity) {
  if ((entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0) && (entity.getData("skyhighheroes:dyn/wave_changing_timer") < 1)) {
    return 1;
  }
  return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1.0) ? 10 : 0;
}

function resetCard(player, manager) {    
    manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
    manager.setData(player, "skyhighheroes:dyn/head_toggle", 0);
    return true;
}

function cycleUpCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") + 1);
  if (player.getData("skyhighheroes:dyn/selected_battle_card") > 2) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
  }
  return true;
}

function cycleDownCard(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") - 1);
  if (player.getData("skyhighheroes:dyn/selected_battle_card") < 0) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 2);
  }
  return true;
}

function activateCard0(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
  return true; 
}

function activateCard1(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/battle_card", 1);
  return true; 
}

function activateCard2(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/battle_card", 2);
  return true; 
}

function electroMagnetic(player, manager) {
    if (player.getData("skyhighheroes:dyn/wave_changed") == false) {
        manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
        manager.setData(player, "skyhighheroes:dyn/visualizer_toggle", 0);
        manager.setData(player, "skyhighheroes:dyn/head_toggle", 0);
    }
    if (player.getData("skyhighheroes:dyn/wave_changed") == true) {
        manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
        manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
        manager.setData(player, "skyhighheroes:dyn/visualizer_toggle", 0);
        manager.setData(player, "skyhighheroes:dyn/head_toggle", 0);
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
    if (player.getData("skyhighheroes:dyn/stelar_clothes") > 3) {
        manager.setData(player, "skyhighheroes:dyn/stelar_clothes", 0);
    }
    return true;
}

function headToggle(player, manager) {
    manager.setData(player, "skyhighheroes:dyn/head_toggle", player.getData("skyhighheroes:dyn/head_toggle") + 1);
    if (player.getData("skyhighheroes:dyn/head_toggle") > 1) {
        manager.setData(player, "skyhighheroes:dyn/head_toggle", 0);
    }
    return true;
}

function inactiveProfile(profile) {
    profile.addAttribute("MAX_HEALTH", -8.0, 0);
    profile.addAttribute("REACH_DISTANCE", -1.0, 0);
}

function getAttributeProfile(entity) {
     if (entity.getData("fiskheroes:shield_blocking")) {
        return "SHIELD";
    }
    if (entity.getData("fiskheroes:blade")) {
        return "BLADE";
    }
    return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) ? null : "INACTIVE";
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

           return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          case "fire": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "magic": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          case "cactus": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "cold": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "energy": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "electricity": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "sound": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "thorns": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

          case "shuriken": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          case "sharp": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          case "bullet": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          case "blunt": 

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:invisible");

          default:

            return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

        }

    case "fiskheroes:transformation":

      return entity.isAlive() && entity.getUUID() == getID();

    case "fiskheroes:controlled_flight":

      return (entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0 && entity.getData("skyhighheroes:dyn/wave_changed")) && entity.getUUID() == getID();

    case "fiskheroes:blade":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("skyhighheroes:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_timer") == 0;

    case "fiskheroes:shield":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("skyhighheroes:dyn/battle_card") == 1 && entity.getData("fiskheroes:flight_timer") == 0;

    case "fiskheroes:arrow_catching":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:shield_blocking") && !entity.getData("fiskheroes:blade");

    case "fiskheroes:energy_bolt":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getHeldItem().isEmpty();

    default:

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

    }

}

function isKeyBindEnabled(entity, keyBind) {

  switch (keyBind) {

    case "func_ELECTROMAGNETIC":

      return entity.isAlive() && entity.getUUID() == getID() && entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0);

    case "WAVE_CHANGE":

      return entity.isAlive() && entity.getUUID() == getID() && entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0);

    case "func_VISUALIZER_TOGGLE":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == getID();

    case "func_CYCLE_CLOTHES":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == getID();

    case "INTANGIBILITY":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getData("fiskheroes:flight_timer") > 0;

    case "SHIELD_THROW":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getHeldItem().name() == "fiskheroes:captain_americas_shield";

    case "AIM":

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID() && entity.getHeldItem().name() != "fiskheroes:captain_americas_shield";

    case "func_HEADTOGGLE":

      return entity.isAlive() && entity.getUUID() == getID() && entity.getData("fiskheroes:flight_timer") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.isSneaking();

    default:

      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

  }

}

function hasProperty(entity, property) {

  switch (property) {

    case "BREATHE_SPACE":

      return entity.getUUID() == getID() && entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0;

    default:

      return false;

  }

}

function hasPermission(entity, permission) {
  
  switch (permission) {

    case "USE_CHRONOS_RIFLE":

      return entity.getUUID() == getID() && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;

    case "USE_SHIELD":

      return entity.getUUID() == getID() && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
  
    default:

      return false;

  }

}

function canAim(entity) {

  return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getUUID() == getID();

}

function getID() {
  return "";
}