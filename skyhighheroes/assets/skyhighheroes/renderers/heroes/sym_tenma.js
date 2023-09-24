extend("skyhighheroes:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

function getColor() {
  return 0x00FFFF;
}

loadTextures({
  "eyes": "skyhighheroes:sym/astro/sym_tenma_eyes",
  "boots_lights": "skyhighheroes:sym/astro/sym_tenma_boots_lights",
  "arms_lights": "skyhighheroes:sym/astro/sym_tenma_arms_lights",
  "eyes_normal": "skyhighheroes:sym/astro/sym_tenma_eyes_normal",
  "base": "skyhighheroes:sym/astro/sym_tenma_base",
  "base_flying": "skyhighheroes:sym/astro/sym_tenma_base_flying",
  "base_head": "skyhighheroes:sym/astro/sym_tenma_base_head",
  "base_torso_boots": "skyhighheroes:sym/astro/sym_tenma_base_torso_boots",
  "base_torso_boots_legs": "skyhighheroes:sym/astro/sym_tenma_base_torso_boots_legs",
  "base_legs": "skyhighheroes:sym/astro/sym_tenma_base_legs",
  "base_legs_boots": "skyhighheroes:sym/astro/sym_tenma_base_legs_boots",
  "long": "skyhighheroes:sym/astro/sym_tenma_long",
  "long_flying": "skyhighheroes:sym/astro/sym_tenma_long_flying",
  "long_head_torso": "skyhighheroes:sym/astro/sym_tenma_long_head_torso",
  "long_torso_boots": "skyhighheroes:sym/astro/sym_tenma_long_torso_boots",
  "long_torso_boots_legs": "skyhighheroes:sym/astro/sym_tenma_long_torso_boots_legs",
  "long_legs": "skyhighheroes:sym/astro/sym_tenma_long_legs",
  "long_legs_torso": "skyhighheroes:sym/astro/sym_tenma_long_legs_torso",
  "long_legs_boots": "skyhighheroes:sym/astro/sym_tenma_long_legs_boots",
  "long_legs_torso_boots": "skyhighheroes:sym/astro/sym_tenma_long_legs_torso_boots",
  "short": "skyhighheroes:sym/astro/sym_tenma_short",
  "short_flying": "skyhighheroes:sym/astro/sym_tenma_short_flying",
  "short_torso_boots": "skyhighheroes:sym/astro/sym_tenma_short_torso_boots",
  "short_legs": "skyhighheroes:sym/astro/sym_tenma_short_legs",
  "short_legs_torso": "skyhighheroes:sym/astro/sym_tenma_short_legs_torso",
  "short_legs_boots": "skyhighheroes:sym/astro/sym_tenma_short_legs_boots",
  "short_legs_torso_boots": "skyhighheroes:sym/astro/sym_tenma_short_torso_boots",
  "normal": "skyhighheroes:sym/astro/sym_tenma_normal",
  "normal_flying": "skyhighheroes:sym/astro/sym_tenma_normal_flying",
  "normal_torso_boots": "skyhighheroes:sym/astro/sym_tenma_normal_torso_boots",
  "normal_torso_boots_legs": "skyhighheroes:sym/astro/sym_tenma_normal_torso_boots_legs",
  "normal_legs": "skyhighheroes:sym/astro/sym_tenma_normal_legs",
  "normal_legs_torso": "skyhighheroes:sym/astro/sym_tenma_normal_legs_torso",
  "normal_legs_boots": "skyhighheroes:sym/astro/sym_tenma_normal_legs_boots",
  "normal_legs_torso_boots": "skyhighheroes:sym/astro/sym_tenma_normal_legs_torso_boots",
  "cannon_lights": "skyhighheroes:sym/astro/sym_tenma_cannon_lights",
  "shield": "skyhighheroes:sym/astro/sym_tenma_shield",
  "katana": "skyhighheroes:sym/astro/sym_tenma_katana",
  "katana_lights": "skyhighheroes:sym/astro/sym_tenma_katana_lights",
  "scythe": "skyhighheroes:sym/astro/sym_tenma_scythe",
  "scythe_lights": "skyhighheroes:sym/astro/sym_tenma_scythe_lights",
  "rifle": "skyhighheroes:sym/astro/sym_tenma_rifle",
  "rifle_lights": "skyhighheroes:sym/astro/sym_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  //Boot Rockets
  rockets = astro.initBoosters(renderer, getColor());
  cannon = astro.initCannon(renderer);
  astro.initBeams(renderer, getColor());
  stuff.bindSpeedTrail(renderer, "skyhighheroes:sym_tenma_speed");
};

function getSuitID() {
  return "skyhighheroes:sym_tenma";
}

function getID() {
  return "340d3667-9ee9-49eb-b98b-e12c7534b577";
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
  cannon.render(entity, renderLayer);
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
};