//Beam stuff
function bindBeam(renderer, propertyName, beam, anchor, color, entries) {
  var prop = renderer.bindProperty(propertyName).setAnchor(anchor);
  var constln = renderer.createResource("BEAM_CONSTELLATION", null);

  for (var i = 0; i < entries.length; ++i) {
    constln.bindBeam(entries[i]);
  };

  if (typeof beam === "string") {
    beam = renderer.createResource("BEAM_RENDERER", beam);
  };

  prop.setConstellation(constln);
  prop.setRenderer(beam);
  prop.color.set(color);
  return prop;
};

//Animation stuff
function addAnimationEvent(renderer, key, value) {
  var event = renderer.createResource("ANIMATION_EVENT", null);

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; ++i) {
      var e = parseAnimationEntry(renderer, value[i]);
      event.bindAnimation(e.anim, e.weight);
    };
  } else {
    var e = parseAnimationEntry(renderer, value);
    event.bindAnimation(e.anim, e.weight);
  };

  renderer.addAnimationEvent(key, event);
  return event;
};
function parseAnimationEntry(renderer, value) {
  if (typeof value === "string") {
    return {
      "anim": renderer.createResource("ANIMATION", value),
      "weight": 1
    };
  };
  return {
    "anim": renderer.createResource("ANIMATION", value.key),
    "weight": value.hasOwnProperty("weight") ? value.weight : 1
  };
};
function addAnimation(renderer, key, anim) {
  if (typeof anim === "string") {
    anim = renderer.createResource("ANIMATION", anim);
  };

  renderer.addCustomAnimation(key, anim);
  return anim;
};
function addAnimationWithData(renderer, key, anim, dataVar) {
  return addAnimation(renderer, key, anim).setData((entity, data) => data.load(entity.getInterpolatedData(dataVar)));
};

function addPredationAnimation(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighheroes:dyn/predation_timer"));
    data.load(1, entity.getData("skyhighheroes:dyn/predation"));
  });
  anim.setCondition(entity => entity.getData("skyhighheroes:dyn/battle_card") > 0)
  anim.priority = -9.75;
};

function addBasePredationAnimation(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighheroes:dyn/predation_timer"));
  });
  anim.setCondition(entity => entity.getData("skyhighheroes:dyn/battle_card") == 0)
  anim.priority = -9.75;
};

function addSwordAnimations(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighheroes:dyn/sword_timer"));
    data.load(1, entity.getInterpolatedData("fiskheroes:shield_blocking_timer"));
  });
  anim.setCondition(entity => entity.getData("skyhighheroes:dyn/battle_card") == 2);
  anim.priority = -9.75;
};

function addFlightHoldingAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighheroes:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighheroes:dyn/superhero_landing_timer")));
      data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };
  anim.setCondition(entity => !entity.getHeldItem().isEmpty());

  anim.priority = -10;
  renderer.reprioritizeDefaultAnimation("PUNCH", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_CHRONOS_RIFLE", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_PIZZA", -9);
  renderer.reprioritizeDefaultAnimation("BLOCK_CAPS_SHIELD", -9);
  renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
};

function addFlightBaseAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  
  anim.setCondition(entity => entity.getHeldItem().isEmpty())
  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighheroes:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighheroes:dyn/superhero_landing_timer")));
      data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };
  
  anim.priority = -10;
  renderer.reprioritizeDefaultAnimation("PUNCH", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_CHRONOS_RIFLE", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_PIZZA", -9);
  renderer.reprioritizeDefaultAnimation("BLOCK_CAPS_SHIELD", -9);
  renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
};

function addHoverAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:levitate_timer"));
      data.load(1, entity.loop(20 * Math.PI) + 0.4);
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };

  anim.priority = -9.5;
  return anim;
};

function initForceField(renderer, color) {
  addAnimationWithData(renderer, "skyhigh.BLOCKING", "skyhighheroes:force_field_holding", "fiskheroes:shield_blocking_timer")
    .setCondition(entity => entity.getData("skyhighheroes:dyn/battle_card") == 1)
    .priority = -5;
  var forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.color.set(color);
  forcefield.setShape(36, 36).setOffset(0.0, 10.0, 0.0).setScale(2.0);
  forcefield.setCondition(entity => {
    forcefield.opacity = (entity.getData("skyhighheroes:dyn/battle_card") == 1) * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.1;
    return true;
  });
};

//Stelar Animations
function initStelarAnimations(renderer) {
  //Aiming
  addAnimationWithData(renderer, "stelar.AIMING", "skyhighheroes:stelar_aim", "fiskheroes:aiming_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 10;
  addAnimationEvent(renderer, "CEILING_CRAWL", "skyhighheroes:em_wall_ceiling_stand");
  addPredationAnimation(renderer, "stelar.PREDATION", "skyhighheroes:stelar_predation");
  addSwordAnimations(renderer, "stelar.SWORD", "skyhighheroes:stelar_sword");
  addBasePredationAnimation(renderer, "stelar.PREDATION_BASE", "skyhighheroes:stelar_predation_base");
  //Flight
  addFlightBaseAnimation(renderer, "stelar.BASE_FLIGHT", "skyhighheroes:flight/stelar_base_flight.anim.json");
  addFlightHoldingAnimation(renderer, "stelar.HOLDING_FLIGHT", "skyhighheroes:flight/stelar_holding_flight.anim.json");
  addAnimationWithData(renderer, "stelar.LAND", "skyhighheroes:stelar_landing", "skyhighheroes:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "stelar.LAND_BOOST", "skyhighheroes:stelar_boosting_landing", "skyhighheroes:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "stelar.ROLL", "skyhighheroes:flight/stelar_barrel_roll", "fiskheroes:barrel_roll_timer")
    .priority = 10;
  addHoverAnimation(renderer, "stelar.HOVER", "skyhighheroes:stelar_hover");
};
//Mega Buster
function initMegaBuster(renderer, color, color_other) {
  renderer.bindProperty("fiskheroes:energy_bolt").color.set(color);
  bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", color_other, [
    { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
  ]);
  bindBeam(renderer, "fiskheroes:lightning_cast", "skyhighheroes:wave_discharge", "rightArm", color_other, [
    { "firstPerson": [-8.0, 4.5, -10.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]);
};

function initNV(renderer) {
  nv_wave_change = renderer.bindProperty("fiskheroes:night_vision");
  nv_wave_change.fogStrength = 0.0;
  nv_wave_change.factor = 1.0;
  nv_wave_change.setCondition(entity => entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0.75);
  nv_visualizer = renderer.bindProperty("fiskheroes:night_vision");
  nv_visualizer.fogStrength = 0.0;
  nv_visualizer.factor = 1.0;
  nv_visualizer.firstPersonOnly = true;
  nv_visualizer.setCondition(entity => entity.getData("skyhighheroes:dyn/visualizer_toggle") == 1);
};

//Equipment
function initLiveries(renderer) {
  var livery_shield = renderer.bindProperty("fiskheroes:livery");
  livery_shield.texture.set("shield", "shield_lights");
  livery_shield.weaponType = "SHIELD";
  var livery_katana = renderer.bindProperty("fiskheroes:livery");
  livery_katana.texture.set("katana", "katana_lights");
  livery_katana.weaponType = "KATANA";
  var livery_scythe = renderer.bindProperty("fiskheroes:livery");
  livery_scythe.texture.set("scythe", "scythe_lights");
  livery_scythe.weaponType = "RUPTURES_SCYTHE";
  var livery_rifle = renderer.bindProperty("fiskheroes:livery");
  livery_rifle.texture.set("rifle", "rifle_lights");
  livery_rifle.weaponType = "CHRONOS_RIFLE";
}
function initEquipment(renderer) {
  //Katana
  katana = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.535, "offset": [-3.05, 0.52, 2.75], "rotation": [-148.0, 90.0, 0.0] },
    { "anchor": "body", "scale": 0.535, "offset": [3.05, 0.52, 2.75], "rotation": [-148.0, -90.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1)).slotIndex = 0;
  //Scythe
  scythe_base = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.55, "offset": [0.5, 4.5, 2.75], "rotation": [0.0, -90.0, 35.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && (entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 1 || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(1).getInteger("Index") == 2)).slotIndex = 1;
  scythe_1 = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.55, "offset": [0.5, 4.5, 3.75], "rotation": [0.0, -90.0, 35.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 0).slotIndex = 1;
  //Rifle
  rifle_base = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.7, "offset": [-3.5, 2.0, 2.75], "rotation": [0.0, -90.0, 60.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && (entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 2 || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 1)).slotIndex = 2;
  rifle_1 = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.7, "offset": [-3.5, 2.0, 3.75], "rotation": [0.0, -90.0, 60.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 0).slotIndex = 2;
  //Shield
  shield_base = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 1.0, "offset": [0.0, 5.0, 2.75], "rotation": [90.0, -180.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 3).slotIndex = 3;
  shield_1 = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 1.0, "offset": [0.0, 5.0, 3.75], "rotation": [90.0, -180.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && (((entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(1).getInteger("Index") == 2 && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(2).getInteger("Index") != 3) || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 1 || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 2) || (entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 0 && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(3).getInteger("Index") != 3 && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(2).getInteger("Index") != 3))).slotIndex = 3;
  shield_2 = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 1.0, "offset": [0.0, 5.0, 4.75], "rotation": [90.0, -180.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) && ((entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(2).getInteger("Index") == 2 || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(1).getInteger("Index") == 1 || entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(1).getInteger("Index") == 2) && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).getInteger("Index") == 0)).slotIndex = 3;
  pickaxe = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 1.0, "offset": [-3.6, 5.0, 12.75], "rotation": [0.0, 90.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1)).slotIndex = 4;
  shovel = renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 1.0, "offset": [4.6, 5.0, 12.75], "rotation": [0.0, 90.0, 0.0] }
  ]).setCondition(entity => ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW") || entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1)).slotIndex = 5;
};

//Omega-Xis
function initHead(renderer) {
  //sword
  var swordMain = renderer.createEffect("fiskheroes:shield");
  swordMain.texture.set("sword", "sword_lights");
  swordMain.anchor.set("rightArm");
  swordMain.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordMain.large = true;
  var swordBlade = renderer.createEffect("fiskheroes:shield");
  swordBlade.texture.set(null, "sword_blade");
  swordBlade.anchor.set("rightArm");
  swordBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordBlade.large = true;
  var swordWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordWaveChanging.texture.set(null, "sword_wave_changing_lights");
  swordWaveChanging.anchor.set("rightArm");
  swordWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordWaveChanging.large = true;
  //Right
  var swordRight = renderer.createEffect("fiskheroes:shield");
  swordRight.texture.set("sword_sides");
  swordRight.anchor.set("rightArm");
  swordRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  swordRight.large = true;
  var swordRightWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordRightWaveChanging.texture.set(null, "sword_sides_wave_changing_lights");
  swordRightWaveChanging.anchor.set("rightArm");
  swordRightWaveChanging.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  swordRightWaveChanging.large = true;
  //Left
  var swordLeft = renderer.createEffect("fiskheroes:shield");
  swordLeft.texture.set("sword_sides");
  swordLeft.anchor.set("rightArm");
  swordLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  swordLeft.large = true;
  var swordLeftWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordLeftWaveChanging.texture.set(null, "sword_sides_wave_changing_lights");
  swordLeftWaveChanging.anchor.set("rightArm");
  swordLeftWaveChanging.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  swordLeftWaveChanging.large = true;
  //Top
  var swordTop = renderer.createEffect("fiskheroes:shield");
  swordTop.texture.set("sword_sides");
  swordTop.anchor.set("rightArm");
  swordTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  swordTop.large = true;
  var swordTopWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordTopWaveChanging.texture.set(null, "sword_sides_wave_changing_lights");
  swordTopWaveChanging.anchor.set("rightArm");
  swordTopWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  swordTopWaveChanging.large = true;
  //Bottom
  var swordBottom = renderer.createEffect("fiskheroes:shield");
  swordBottom.texture.set("sword_sides");
  swordBottom.anchor.set("rightArm");
  swordBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  swordBottom.large = true;
  var swordBottomWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordBottomWaveChanging.texture.set(null, "sword_sides_wave_changing_lights");
  swordBottomWaveChanging.anchor.set("rightArm");
  swordBottomWaveChanging.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  swordBottomWaveChanging.large = true;
  //Front
  var swordFront = renderer.createEffect("fiskheroes:shield");
  swordFront.texture.set("sword_front");
  swordFront.anchor.set("rightArm");
  swordFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  swordFront.large = true;
  var swordFrontWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordFrontWaveChanging.texture.set(null, "sword_front_wave_changing_lights");
  swordFrontWaveChanging.anchor.set("rightArm");
  swordFrontWaveChanging.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  swordFrontWaveChanging.large = true;
  //Head
  //Right
  var headRight = renderer.createEffect("fiskheroes:shield");
  headRight.texture.set("head_right", "head_right_lights");
  headRight.anchor.set("rightArm");
  headRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRight.large = true;
  var headRightWaveChange = renderer.createEffect("fiskheroes:shield");
  headRightWaveChange.texture.set("head_right_wave_change", "head_right_wave_change_lights");
  headRightWaveChange.anchor.set("rightArm");
  headRightWaveChange.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChange.large = true;
  var headRightWaveChanging = renderer.createEffect("fiskheroes:shield");
  headRightWaveChanging.texture.set(null, "head_right_wave_changing_lights");
  headRightWaveChanging.anchor.set("rightArm");
  headRightWaveChanging.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChanging.large = true;
  //Left
  var headLeft = renderer.createEffect("fiskheroes:shield");
  headLeft.texture.set("head_left", "head_left_lights");
  headLeft.anchor.set("rightArm");
  headLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeft.large = true;
  var headLeftWaveChange = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChange.texture.set("head_left_wave_change", "head_left_wave_change_lights");
  headLeftWaveChange.anchor.set("rightArm");
  headLeftWaveChange.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChange.large = true;
  var headLeftWaveChanging = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChanging.texture.set(null, "head_left_wave_changing_lights");
  headLeftWaveChanging.anchor.set("rightArm");
  headLeftWaveChanging.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChanging.large = true;
  //Top
  var headTop = renderer.createEffect("fiskheroes:shield");
  headTop.texture.set("head_top", "head_top_lights");
  headTop.anchor.set("rightArm");
  headTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTop.large = true;
  var headTopWaveChange = renderer.createEffect("fiskheroes:shield");
  headTopWaveChange.texture.set("head_top_wave_change", "head_top_wave_change_lights");
  headTopWaveChange.anchor.set("rightArm");
  headTopWaveChange.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChange.large = true;
  var headTopWaveChanging = renderer.createEffect("fiskheroes:shield");
  headTopWaveChanging.texture.set(null, "head_top_wave_changing_lights");
  headTopWaveChanging.anchor.set("rightArm");
  headTopWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChanging.large = true;
  //Bottom
  var headBottom = renderer.createEffect("fiskheroes:shield");
  headBottom.texture.set("head_bottom", "head_bottom_lights");
  headBottom.anchor.set("rightArm");
  headBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottom.large = true;
  var headBottomWaveChange = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChange.texture.set("head_bottom_wave_change", "head_bottom_wave_change_lights");
  headBottomWaveChange.anchor.set("rightArm");
  headBottomWaveChange.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChange.large = true;
  var headBottomWaveChanging = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChanging.texture.set(null, "head_bottom_wave_changing_lights");
  headBottomWaveChanging.anchor.set("rightArm");
  headBottomWaveChanging.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChanging.large = true;
  //Front
  var headFront = renderer.createEffect("fiskheroes:shield");
  headFront.texture.set("head_front", null);
  headFront.anchor.set("rightArm");
  headFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFront.large = true;
  var headFrontWaveChange = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChange.texture.set("head_front_wave_change", null);
  headFrontWaveChange.anchor.set("rightArm");
  headFrontWaveChange.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChange.large = true;
  var headFrontWaveChanging = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChanging.texture.set(null, "head_front_wave_changing_lights");
  headFrontWaveChanging.anchor.set("rightArm");
  headFrontWaveChanging.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChanging.large = true;
  return {
    render: (entity, renderLayer) => {
      //sword.unfold = entity.getInterpolatedData("skyhighheroes:dyn/sword_timer");
      //sword.opacity = Math.min(Math.max((2 * entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")), 0), 1);
      //sword.setOffset(1.5, Math.min(Math.max((16.0 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")) - 4), 0), 8), 0.0);
      //sword.setScale(Math.min(Math.max((2 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")) + 0.5), 0), 1), Math.min(Math.max((1.75 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer"))), 0), 1), Math.min(Math.max((1 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer"))), 0), 1));
      if (renderLayer == "CHESTPLATE") {
        if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW"))) {
          if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1) {
            headRightWaveChange.render();
            headLeftWaveChange.render();
            headTopWaveChange.render();
            headBottomWaveChange.render();
            headFrontWaveChange.render();
          };
          if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) {
            headRight.render();
            headLeft.render();
            headTop.render();
            headBottom.render();
            headFront.render();
          }
          if (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) {
            headRightWaveChanging.render();
            headLeftWaveChanging.render();
            headTopWaveChanging.render();
            headBottomWaveChanging.render();
            headFrontWaveChanging.render();
          }
        };
        if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") > 0) {
          swordMain.render();
          swordRight.render();
          swordLeft.render();
          swordTop.render();
          swordBottom.render();
          swordFront.render();
          swordWaveChanging.render();
          swordRightWaveChanging.render();
          swordLeftWaveChanging.render();
          swordTopWaveChanging.render();
          swordBottomWaveChanging.render();
          swordFrontWaveChanging.render();
          if (entity.getData("skyhighheroes:dyn/sword") && entity.getHeldItem().isEmpty()) {
            swordBlade.render();
          };
        };
      };
    }
  };
};

function initOmegaXis(renderer) {
  //Blade
  var swordBlade = renderer.createEffect("fiskheroes:shield");
  swordBlade.texture.set(null, "sword");
  swordBlade.anchor.set("rightArm");
  swordBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.5, 8.0, 0.0);
  swordBlade.large = true;
  //Right
  var headRight = renderer.createEffect("fiskheroes:shield");
  headRight.texture.set("head_right", "head_right_lights");
  headRight.anchor.set("rightArm");
  headRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRight.large = true;
  var headRightWaveChange = renderer.createEffect("fiskheroes:shield");
  headRightWaveChange.texture.set("head_right_wave_change", "head_right_wave_change_lights");
  headRightWaveChange.anchor.set("rightArm");
  headRightWaveChange.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChange.large = true;
  var headRightWaveChanging = renderer.createEffect("fiskheroes:shield");
  headRightWaveChanging.texture.set(null, "head_right_wave_changing_lights");
  headRightWaveChanging.anchor.set("rightArm");
  headRightWaveChanging.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChanging.large = true;
  //Left
  var headLeft = renderer.createEffect("fiskheroes:shield");
  headLeft.texture.set("head_left", "head_left_lights");
  headLeft.anchor.set("rightArm");
  headLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeft.large = true;
  var headLeftWaveChange = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChange.texture.set("head_left_wave_change", "head_left_wave_change_lights");
  headLeftWaveChange.anchor.set("rightArm");
  headLeftWaveChange.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChange.large = true;
  var headLeftWaveChanging = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChanging.texture.set(null, "head_left_wave_changing_lights");
  headLeftWaveChanging.anchor.set("rightArm");
  headLeftWaveChanging.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChanging.large = true;
  //Top
  var headTop = renderer.createEffect("fiskheroes:shield");
  headTop.texture.set("head_top", "head_top_lights");
  headTop.anchor.set("rightArm");
  headTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTop.large = true;
  var headTopWaveChange = renderer.createEffect("fiskheroes:shield");
  headTopWaveChange.texture.set("head_top_wave_change", "head_top_wave_change_lights");
  headTopWaveChange.anchor.set("rightArm");
  headTopWaveChange.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChange.large = true;
  var headTopWaveChanging = renderer.createEffect("fiskheroes:shield");
  headTopWaveChanging.texture.set(null, "head_top_wave_changing_lights");
  headTopWaveChanging.anchor.set("rightArm");
  headTopWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChanging.large = true;
  //Bottom
  var headBottom = renderer.createEffect("fiskheroes:shield");
  headBottom.texture.set("head_bottom", "head_bottom_lights");
  headBottom.anchor.set("rightArm");
  headBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottom.large = true;
  var headBottomWaveChange = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChange.texture.set("head_bottom_wave_change", "head_bottom_wave_change_lights");
  headBottomWaveChange.anchor.set("rightArm");
  headBottomWaveChange.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChange.large = true;
  var headBottomWaveChanging = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChanging.texture.set(null, "head_bottom_wave_changing_lights");
  headBottomWaveChanging.anchor.set("rightArm");
  headBottomWaveChanging.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChanging.large = true;
  //Front
  var headFront = renderer.createEffect("fiskheroes:shield");
  headFront.texture.set("head_front", null);
  headFront.anchor.set("rightArm");
  headFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFront.large = true;
  var headFrontWaveChange = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChange.texture.set("head_front_wave_change", null);
  headFrontWaveChange.anchor.set("rightArm");
  headFrontWaveChange.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChange.large = true;
  var headFrontWaveChanging = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChanging.texture.set(null, "head_front_wave_changing_lights");
  headFrontWaveChanging.anchor.set("rightArm");
  headFrontWaveChanging.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChanging.large = true;
  return {
    render: (entity, renderLayer) => {
      swordBlade.unfold = entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")
      swordBlade.opacity = Math.min(Math.max((2 * entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")), 0), 1);
      swordBlade.setOffset(1.5, Math.min(Math.max((16.0 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")) - 4), 0), 8), 0.0);
      swordBlade.setScale(Math.min(Math.max((2 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer")) + 0.5), 0), 1), Math.min(Math.max((1.75 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer"))), 0), 1), Math.min(Math.max((1 * (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer"))), 0), 1));
      if (renderLayer == "CHESTPLATE") {
        if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || ((entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW"))) {
          if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1) {
            headRightWaveChange.render();
            headLeftWaveChange.render();
            headTopWaveChange.render();
            headBottomWaveChange.render();
            headFrontWaveChange.render();
          };
          if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) {
            headRight.render();
            headLeft.render();
            headTop.render();
            headBottom.render();
            headFront.render();
          }
          if (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) {
            headRightWaveChanging.render();
            headLeftWaveChanging.render();
            headTopWaveChanging.render();
            headBottomWaveChanging.render();
            headFrontWaveChanging.render();
          }
        };
        if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") > 0) {
          if (entity.getData("skyhighheroes:dyn/sword") && entity.getHeldItem().isEmpty()) {
            swordBlade.render();
          };
        };
      };
    }
  };
};