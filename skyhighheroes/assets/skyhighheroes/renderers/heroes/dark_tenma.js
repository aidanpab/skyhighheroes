extend("skyhighheroes:base_tenma");

var rockets = implement("skyhighheroes:external/astro_rockets");
var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

function getCLR() {
    return 0x696969;
}

loadTextures({
    "lights" : "skyhighheroes:dark/astro/dark_tenma_lights",
    "lights_flying" : "skyhighheroes:dark/astro/dark_tenma_lights_flying",
    "lights_normal" : "skyhighheroes:dark/astro/dark_tenma_lights_normal",
    "lights_normal_flying" : "skyhighheroes:dark/astro/dark_tenma_lights_normal_flying",
    "base": "skyhighheroes:dark/astro/dark_tenma_base",
    "base_flying": "skyhighheroes:dark/astro/dark_tenma_base_flying",
    "long" : "skyhighheroes:dark/astro/dark_tenma_long",
    "long_flying" : "skyhighheroes:dark/astro/dark_tenma_long_flying",
    "short" : "skyhighheroes:dark/astro/dark_tenma_short",
    "short_flying" : "skyhighheroes:dark/astro/dark_tenma_short_flying",
    "normal" : "skyhighheroes:dark/astro/dark_tenma_normal",
    "normal_flying" : "skyhighheroes:dark/astro/dark_tenma_normal_flying",
    "cannon_lights_inner" : "skyhighheroes:dark/astro/dark_tenma_cannon_lights_inner",
    "cannon" : "skyhighheroes:astro/base_tenma_cannon",
    "cannon_back" : "skyhighheroes:astro/base_tenma_cannon_back",
    "shield": "skyhighheroes:dark/astro/dark_tenma_shield",
    "katana": "skyhighheroes:dark/astro/dark_tenma_katana",
    "katana_lights": "skyhighheroes:dark/astro/dark_tenma_katana_lights",
    "scythe": "skyhighheroes:dark/astro/dark_tenma_scythe",
    "scythe_lights": "skyhighheroes:dark/astro/dark_tenma_scythe_lights"
});

function initEffects(renderer) {
    parent.initEffects(renderer);
    //Boot Rockets
    rockets.initBoosters(renderer, "skyhighheroes:gray_fire_layer1", "skyhighheroes:gray_fire_layer2");
    astro.initBeams(renderer, getCLR());
    stuff.bindSpeedTrail(renderer, "skyhighheroes:dark_tenma_speed");
}

function getID() {
    return "ad0fedda-b04a-47b3-bd2b-fa94b3f2fa34";
}

function init(renderer) {
    parent.init(renderer);
    initEffects(renderer);
    initAnimations(renderer);
}