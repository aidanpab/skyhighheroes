extend("skyhighheroes:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

function getCLR() {
    return 0x696969;
}

loadTextures({
    "eyes" : "skyhighheroes:dark/astro/dark_tenma_eyes",
    "boots_lights" : "skyhighheroes:dark/astro/dark_tenma_boots_lights",
    "eyes_normal" : "skyhighheroes:dark/astro/dark_tenma_eyes_normal",
    "base": "skyhighheroes:dark/astro/dark_tenma_base",
    "base_flying": "skyhighheroes:dark/astro/dark_tenma_base_flying",
    "base_head": "skyhighheroes:dark/astro/dark_tenma_base_head",
    "base_torso_boots": "skyhighheroes:dark/astro/dark_tenma_base_torso_boots",
    "base_torso_boots_legs": "skyhighheroes:dark/astro/dark_tenma_base_torso_boots_legs",
    "base_legs": "skyhighheroes:dark/astro/dark_tenma_base_legs",
    "base_legs_boots": "skyhighheroes:dark/astro/dark_tenma_base_legs_boots",
    "long" : "skyhighheroes:dark/astro/dark_tenma_long",
    "long_flying" : "skyhighheroes:dark/astro/dark_tenma_long_flying",
    "long_head_torso": "skyhighheroes:dark/astro/dark_tenma_long_head_torso",
    "long_torso_boots": "skyhighheroes:dark/astro/dark_tenma_long_torso_boots",
    "long_torso_boots_legs": "skyhighheroes:dark/astro/dark_tenma_long_torso_boots_legs",
    "long_legs": "skyhighheroes:dark/astro/dark_tenma_long_legs",
    "long_legs_torso": "skyhighheroes:dark/astro/dark_tenma_long_legs_torso",
    "long_legs_boots": "skyhighheroes:dark/astro/dark_tenma_long_legs_boots",
    "long_legs_torso_boots": "skyhighheroes:dark/astro/dark_tenma_long_legs_torso_boots",
    "short" : "skyhighheroes:dark/astro/dark_tenma_short",
    "short_flying" : "skyhighheroes:dark/astro/dark_tenma_short_flying",
    "short_torso_boots": "skyhighheroes:dark/astro/dark_tenma_short_torso_boots",
    "short_legs": "skyhighheroes:dark/astro/dark_tenma_short_legs",
    "short_legs_torso": "skyhighheroes:dark/astro/dark_tenma_short_legs_torso",
    "short_legs_boots": "skyhighheroes:dark/astro/dark_tenma_short_legs_boots",
    "short_legs_torso_boots": "skyhighheroes:dark/astro/dark_tenma_short_torso_boots",
    "normal" : "skyhighheroes:dark/astro/dark_tenma_normal",
    "normal_flying" : "skyhighheroes:dark/astro/dark_tenma_normal_flying",
    "normal_torso_boots": "skyhighheroes:dark/astro/dark_tenma_normal_torso_boots",
    "normal_torso_boots_legs": "skyhighheroes:dark/astro/dark_tenma_normal_torso_boots_legs",
    "normal_legs": "skyhighheroes:dark/astro/dark_tenma_normal_legs",
    "normal_legs_torso": "skyhighheroes:dark/astro/dark_tenma_normal_legs_torso",
    "normal_legs_boots": "skyhighheroes:dark/astro/dark_tenma_normal_legs_boots",
    "normal_legs_torso_boots": "skyhighheroes:dark/astro/dark_tenma_normal_legs_torso_boots",
    "cannon_lights_inner" : "skyhighheroes:dark/astro/dark_tenma_cannon_lights_inner",
    "shield": "skyhighheroes:dark/astro/dark_tenma_shield",
    "katana": "skyhighheroes:dark/astro/dark_tenma_katana",
    "katana_lights": "skyhighheroes:dark/astro/dark_tenma_katana_lights",
    "scythe": "skyhighheroes:dark/astro/dark_tenma_scythe",
    "scythe_lights": "skyhighheroes:dark/astro/dark_tenma_scythe_lights",
    "rifle": "skyhighheroes:dark/astro/dark_tenma_rifle",
    "rifle_lights": "skyhighheroes:dark/astro/dark_tenma_rifle_lights"
});

function initEffects(renderer) {
    parent.initEffects(renderer);
    //Boot Rockets
    rockets = astro.initBoosters(renderer, getCLR());
    astro.initBeams(renderer, getCLR());
    stuff.bindSpeedTrail(renderer, "skyhighheroes:dark_tenma_speed");
}

function getSuitID() {
    return "skyhighheroes:dark_tenma";
}

function getID() {
    return "ad0fedda-b04a-47b3-bd2b-fa94b3f2fa34";
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