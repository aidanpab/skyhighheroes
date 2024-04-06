extend("skyhighheroes:aidan_stelar");

loadTextures({
  "base": "skyhighheroes:aidan/aidan_stelar_gundam_base",
  "lights": "skyhighheroes:aidan/aidan_stelar_gundam_lights",
  "base_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_wave_change.tx.json",
  "lights_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighheroes:aidan/aidan_stelar_gundam_wave_changing_lights.tx.json",
  "head_right": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_right.tx.json",
  "head_right_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_right_wave_change.tx.json",
  "head_left": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_left.tx.json",
  "head_left_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_left_wave_change.tx.json",
  "head_top": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_top.tx.json",
  "head_top_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_top_wave_change.tx.json",
  "head_bottom": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_bottom.tx.json",
  "head_bottom_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_bottom_wave_change.tx.json",
  "head_front": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_front.tx.json",
  "head_front_wave_change": "skyhighheroes:aidan/aidan_stelar_gundam_omega_xis_front_wave_change.tx.json",
  "shield": "skyhighheroes:aidan/aidan_stelar_gundam_shield",
  "katana": "skyhighheroes:aidan/aidan_stelar_gundam_katana",
  "scythe": "skyhighheroes:aidan/aidan_stelar_gundam_scythe",
  "rifle": "skyhighheroes:aidan/aidan_stelar_gundam_rifle"
});

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("CHESTPLATE", "pegasus_transer");
};