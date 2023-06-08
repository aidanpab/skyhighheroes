extend("skyhighheroes:chase_stelar");

loadTextures({
  "base": "skyhighheroes:chase/chase_stelar_iron_man_base",
  "lights": "skyhighheroes:chase/chase_stelar_iron_man_lights",
  "base_tx": "skyhighheroes:chase/chase_stelar_iron_man_base.tx.json",
  "lights_tx": "skyhighheroes:chase/chase_stelar_iron_man_lights.tx.json",
  "wave_change_lights": "skyhighheroes:chase/chase_stelar_iron_man_wave_change_lights.tx.json",
  "visualizer_up_lights": "skyhighheroes:chase/chase_stelar_up_lights",
  "visualizer_down_lights": "skyhighheroes:chase/chase_stelar_down_lights",
  "omega_xis_bottom": "skyhighheroes:chase/chase_stelar_iron_man_omega_xis_bottom",
  "omega_xis_left": "skyhighheroes:chase/chase_stelar_iron_man_omega_xis_left",
  "omega_xis_right": "skyhighheroes:chase/chase_stelar_iron_man_omega_xis_right",
  "omega_xis_top": "skyhighheroes:chase/chase_stelar_iron_man_omega_xis_top",
  "omega_xis_front": "skyhighheroes:chase/chase_stelar_iron_man_omega_xis_front",
  "shield": "skyhighheroes:chase/chase_stelar_iron_man_shield",
  "katana": "skyhighheroes:chase/chase_stelar_iron_man_katana",
  "scythe": "skyhighheroes:chase/chase_stelar_iron_man_scythe",
  "rifle": "skyhighheroes:chase/chase_stelar_iron_man_rifle"
});

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("CHESTPLATE", "leo_transer");
}