var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
//var bodyTemp = implement("skyhighheroes:external/body_temperature");
var stelar = implement("skyhighheroes:external/stelar");
function init(hero) {
  hero.setTickHandler((entity, manager) => {
    stelar.tickHandler(entity, manager);
    //bodyTemp.change(entity, manager, "skyhighheroes:dyn/body_temperature", "skyhighheroes:dyn/stelar_clothes", 500, stelar.temperatureProfileMap());
  });
  hero.setName("Sym Stelar");
  hero.setAliases("sym_stelar");
  hero.addPrimaryEquipment("fiskheroes:katana{Dual:1,display:{Name:\u00A73Sym Stelar's Katanas},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Dual"));
  hero.addPrimaryEquipment("fiskheroes:ruptures_scythe{display:{Name:\u00A73Sym Stelar's Scythe},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:chronos_rifle{display:{Name:\u00A73Sym Stelar's Rifle},ench:[{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1,display:{Name:\u00A73Sym Stelar's Shield},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Electromagnetic"));
  stelar.init(hero, "8d53a071-d3fc-428e-806b-ed16ebe41fe4");
}