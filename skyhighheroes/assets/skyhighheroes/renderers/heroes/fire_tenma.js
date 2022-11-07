extend("skyhighheroes:base_tenma");

var rockets = implement("skyhighheroes:external/astro_rockets_dc");
var utils = implement("fiskheroes:external/utils");

var colorVar = 0xFF0000;

loadTextures({
    "lights" : "skyhighheroes:fire/astro/fire_tenma_lights",
    "lights_flying" : "skyhighheroes:fire/astro/fire_tenma_lights_flying",
    "lights_normal" : "skyhighheroes:fire/astro/fire_tenma_lights_normal",
    "lights_normal_flying" : "skyhighheroes:fire/astro/fire_tenma_lights_normal_flying",
    "base": "skyhighheroes:fire/astro/fire_tenma_base",
    "base_flying": "skyhighheroes:fire/astro/fire_tenma_base_flying",
    "long" : "skyhighheroes:fire/astro/fire_tenma_long",
    "long_flying" : "skyhighheroes:fire/astro/fire_tenma_long_flying",
    "short" : "skyhighheroes:fire/astro/fire_tenma_short",
    "short_flying" : "skyhighheroes:fire/astro/fire_tenma_short_flying",
    "normal" : "skyhighheroes:fire/astro/fire_tenma_normal",
    "normal_flying" : "skyhighheroes:fire/astro/fire_tenma_normal_flying",
    "cannon_lights_inner" : "skyhighheroes:fire/astro/fire_tenma_cannon_lights_inner",
    "cannon" : "skyhighheroes:astro/base_tenma_cannon",
    "cannon_back" : "skyhighheroes:astro/base_tenma_cannon_back",
    "shield": "skyhighheroes:fire/astro/fire_tenma_shield",
    "katana": "skyhighheroes:fire/astro/fire_tenma_katana",
    "katana_lights": "skyhighheroes:fire/astro/fire_tenma_katana_lights",
    "scythe": "skyhighheroes:fire/astro/fire_tenma_scythe",
    "scythe_lights": "skyhighheroes:fire/astro/fire_tenma_scythe_lights"
});

function initEffects(renderer) {
    rockets.init(renderer, "skyhighheroes:red_fire_layer1", "skyhighheroes:blue_fire_layer1", "skyhighheroes:red_fire_layer2", "skyhighheroes:blue_fire_layer2");
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:energy_projection", "rightArm", 0xFF0000, [
        { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:energy_projection", "leftArm", 0x0000FF, [
        { "firstPerson": [4.5, 3.75, -8.0], "offset": [0.5, 9.0, 0.0], "size": [2.0, 2.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
    utils.bindBeam(renderer, "fiskheroes:energy_blast", "fiskheroes:repulsor_blast", "rightArm", 0xFF0000, [
        { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
    //Forcefield
    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(getCLR());
    forcefield.setShape(36, 36).setOffset(0.0, 10.0, 0.0).setScale(2.0);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.1;
        return true;
    });
    //Right
    cannonRight = renderer.createEffect("fiskheroes:shield");
    cannonRight.texture.set("cannon", null);
    cannonRight.anchor.set("rightArm");
    cannonRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.0, 3.0);
    cannonRight.large = true;
    //Left
    cannonLeft = renderer.createEffect("fiskheroes:shield");
    cannonLeft.texture.set("cannon", null);
    cannonLeft.anchor.set("rightArm");
    cannonLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.0, -3.0);
    cannonLeft.large = true;
    //Top
    cannonTop = renderer.createEffect("fiskheroes:shield");
    cannonTop.texture.set("cannon", null);
    cannonTop.anchor.set("rightArm");
    cannonTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.0, 0.0);
    cannonTop.large = true;
    //Bottom
    cannonBottom = renderer.createEffect("fiskheroes:shield");
    cannonBottom.texture.set("cannon", null);
    cannonBottom.anchor.set("rightArm");
    cannonBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.0, 0.0);
    cannonBottom.large = true;
    //Front
    cannonFront = renderer.createEffect("fiskheroes:shield");
    cannonFront.texture.set(null, "cannon_lights_inner");
    cannonFront.anchor.set("rightArm");
    cannonFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(2.0, 13.0, 0.0);
    cannonFront.large = true;
    //Back
    cannonBack = renderer.createEffect("fiskheroes:shield");
    cannonBack.texture.set("cannon_back", null);
    cannonBack.anchor.set("rightArm");
    cannonBack.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(2.0, 4.0, 0.0);
    cannonBack.large = true;
    var livery_shield = renderer.bindProperty("fiskheroes:livery");
    livery_shield.texture.set("shield");
    livery_shield.weaponType = "SHIELD";
    var livery_katana = renderer.bindProperty("fiskheroes:livery");
    livery_katana.texture.set("katana", "katana_lights");
    livery_katana.weaponType = "KATANA";
    var livery_scythe = renderer.bindProperty("fiskheroes:livery");
    livery_scythe.texture.set("scythe", "scythe_lights");
    livery_scythe.weaponType = "RUPTURES_SCYTHE";
    //Shield
    shield = renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.85, "offset": [0.0, 5.0, 2.75], "rotation": [90.0, -180.0, 0.0] }
    ]).slotIndex = 0;
    //Katana
    katana = renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.45475, "offset": [-3.05, 0.52, 3.0], "rotation": [-148.0, 90.0, 0.0] },
        { "anchor": "body", "scale": 0.45475, "offset": [3.05, 0.52, 3.0], "rotation": [-148.0, -90.0, 0.0] }
    ]).slotIndex = 1;
    //Scythe
    scythe = renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.4675, "offset": [0.5, 4.5, 3.0], "rotation": [0.0, -90.0, 35.0] }
    ]).slotIndex = 2;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        cannonRight.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonRight.render();
        cannonLeft.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonLeft.render();
        cannonTop.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonTop.render();
        cannonBottom.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonBottom.render();
        cannonFront.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonFront.render();
        cannonBack.unfold = entity.getInterpolatedData("fiskheroes:aiming_timer");
        cannonBack.render();
    }
    rockets.render(entity, renderLayer, isFirstPersonArm);
}

function getID() {
    return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
}

function init(renderer) {
    parent.init(renderer);
    initEffects(renderer);
    initAnimations(renderer);
}