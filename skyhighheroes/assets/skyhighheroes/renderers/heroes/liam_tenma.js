extend("skyhighheroes:base_tenma");

var tenma = implement("skyhighheroes:external/tenma");
var stuff = implement("skyhighheroes:external/stuff");

function getColor() {
  return 0x0000FF;
};

loadTextures({
  "base": "skyhighheroes:liam/astro/liam_tenma.tx.json",
  "rocket_legs": "skyhighheroes:liam/astro/liam_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighheroes:liam/astro/liam_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighheroes:liam/astro/liam_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighheroes:liam/astro/liam_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighheroes:liam/astro/liam_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighheroes:liam/astro/liam_tenma_eyes",
  "boots_lights": "skyhighheroes:liam/astro/liam_tenma_boots_lights",
  "arms_lights": "skyhighheroes:liam/astro/liam_tenma_arms_lights",
  "eyes_normal": "skyhighheroes:liam/astro/liam_tenma_eyes_normal",
  "boots": "skyhighheroes:liam/astro/liam_tenma_boots",
  "shorts": "skyhighheroes:liam/astro/liam_tenma_shorts",
  "cannon_lights": "skyhighheroes:liam/astro/liam_tenma_cannon_lights",
  "shield": "skyhighheroes:liam/astro/liam_tenma_shield",
  "katana": "skyhighheroes:liam/astro/liam_tenma_katana",
  "katana_lights": "skyhighheroes:liam/astro/liam_tenma_katana_lights",
  "scythe": "skyhighheroes:liam/astro/liam_tenma_scythe",
  "scythe_lights": "skyhighheroes:liam/astro/liam_tenma_scythe_lights",
  "rifle": "skyhighheroes:liam/astro/liam_tenma_rifle",
  "rifle_lights": "skyhighheroes:liam/astro/liam_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = tenma.initCustomBoosters(renderer, 0x0000FF);
  cannon = tenma.initCannon(renderer);
  tenma.initBeams(renderer, 0x0000FF);
  stuff.bindSpeedTrail(renderer, "skyhighheroes:liam_tenma_speed");
};

function getID() {
  return "cd71352c-8cb2-448c-a69d-a310a905ce7b";
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