extend("skyhighheroes:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

function getCLR() {
    return 0xFF8900;
}

loadTextures({
    "lights" : "skyhighheroes:aidan/astro/aidan_tenma_lights",
    "lights_flying" : "skyhighheroes:aidan/astro/aidan_tenma_lights_flying",
    "lights_normal" : "skyhighheroes:aidan/astro/aidan_tenma_lights_normal",
    "lights_normal_flying" : "skyhighheroes:aidan/astro/aidan_tenma_lights_normal_flying",
    "base": "skyhighheroes:aidan/astro/aidan_tenma_base",
    "base_flying": "skyhighheroes:aidan/astro/aidan_tenma_base_flying",
    "long" : "skyhighheroes:aidan/astro/aidan_tenma_long",
    "long_flying" : "skyhighheroes:aidan/astro/aidan_tenma_long_flying",
    "short" : "skyhighheroes:aidan/astro/aidan_tenma_short",
    "short_flying" : "skyhighheroes:aidan/astro/aidan_tenma_short_flying",
    "normal" : "skyhighheroes:aidan/astro/aidan_tenma_normal",
    "normal_flying" : "skyhighheroes:aidan/astro/aidan_tenma_normal_flying",
    "cannon_lights_inner" : "skyhighheroes:aidan/astro/aidan_tenma_cannon_lights_inner",
    "shield": "skyhighheroes:aidan/astro/aidan_tenma_shield",
    "katana": "skyhighheroes:aidan/astro/aidan_tenma_katana",
    "katana_lights": "skyhighheroes:aidan/astro/aidan_tenma_katana_lights",
    "scythe": "skyhighheroes:aidan/astro/aidan_tenma_scythe",
    "scythe_lights": "skyhighheroes:aidan/astro/aidan_tenma_scythe_lights",
    "rifle": "skyhighheroes:aidan/astro/aidan_tenma_rifle",
    "rifle_lights": "skyhighheroes:aidan/astro/aidan_tenma_rifle_lights"
});

function initEffects(renderer) {
    //Boot Rockets
    astro.initCannon(renderer);
    astro.initEquipment(renderer);
    stuff.initForceField(renderer, getCLR());
    rockets = astro.initBoosters(renderer, getCLR());
    astro.initBeams(renderer, getCLR());
    stuff.bindSpeedTrail(renderer, "skyhighheroes:aidan_tenma_speed");
}

function getID() {
    return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
}

function init(renderer) {
    parent.init(renderer);
    initEffects(renderer);
    initAnimations(renderer);
}

function render(entity, renderLayer, isFirstPersonArm) {
    parent.render(entity, renderLayer, isFirstPersonArm);
    rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
}