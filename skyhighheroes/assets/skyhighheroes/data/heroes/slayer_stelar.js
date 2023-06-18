var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
var bodyTemp = implement("skyhighheroes:external/body_temperature");
var stelar = implement("skyhighheroes:external/stelar");
function init(hero) {
  hero.setName("Slayer Stelar");
  hero.setAliases("slayer_stelar");
  hero.addPrimaryEquipment("fiskheroes:katana{Dual:1,display:{Name:\u00A7eSlayer Stelar's Katanas},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Dual"));
  hero.addPrimaryEquipment("fiskheroes:ruptures_scythe{display:{Name:\u00A7eSlayer Stelar's Scythe},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:chronos_rifle{display:{Name:\u00A7eSlayer Stelar's Rifle},ench:[{id:34,lvl:5}]}", true);
  hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1,display:{Name:\u00A7eSlayer Stelar's Shield},ench:[{id:16,lvl:5},{id:19,lvl:2},{id:20,lvl:2},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => item.nbt().getBoolean("Electromagnetic"));
  stelar.init(hero, "85f45fed-d7f1-4966-bfad-915c3dba0153");
  hero.setTickHandler((entity, manager) => {
    stelar.tickHandler(entity, manager);
    bodyTemp.change(entity, manager, [
      { clothingType: 0, biome: "Cold Taiga", tempChangeTicks: -5000.0 },
      { clothingType: 0, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 0, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 0, biome: "Beach", tempChangeTicks: 10000.0 },
      { clothingType: 0, biome: "Desert", tempChangeTicks: 400.0 },
      { clothingType: 0, biome: "Hell", tempChangeTicks: 100.0 },
      { clothingType: 0, biome: "Jungle", tempChangeTicks: 500.0 },
      { clothingType: 0, biome: "Mesa", tempChangeTicks: 1000.0 },
      { clothingType: 0, biome: "Savanna", tempChangeTicks: 2000.0 },
      { clothingType: 0, biome: "Swampland", tempChangeTicks: 1000.0 },
      { clothingType: 1, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 1, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 1, biome: "Cold Taiga", tempChangeTicks: -2000.0 },
      { clothingType: 1, biome: "Cold Beach", tempChangeTicks: -3000.0 },
      { clothingType: 1, biome: "Extreme", tempChangeTicks: -4000.0 },
      { clothingType: 1, biome: "Mega", tempChangeTicks: -5000.0 },
      { clothingType: 1, biome: "Stone Beach", tempChangeTicks: -3000.0 },
      { clothingType: 2, biome: "Ice", tempChangeTicks: -300.0 },
      { clothingType: 2, biome: "Frozen", tempChangeTicks: -300.0 },
      { clothingType: 2, biome: "Cold Taiga", tempChangeTicks: -500.0 },
      { clothingType: 2, biome: "Cold Beach", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Extreme", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Mega", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Stone", tempChangeTicks: -1000.0 },
      { clothingType: 2, biome: "Birch", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Flower", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Forest", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Mesa", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Plains", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Roofed", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Sunflower", tempChangeTicks: -10000.0 },
      { clothingType: 2, biome: "Taiga", tempChangeTicks: -10000.0 },
      { clothingType: 3, biome: "River", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Taiga", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Sunflower", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Stone", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Roofed", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Plains", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Mega", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Forest", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Flower", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Extreme", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Birch", tempChangeTicks: 5000.0 },
      { clothingType: 3, biome: "Mushroom", tempChangeTicks: 2000.0 },
      { clothingType: 3, biome: "Savanna", tempChangeTicks: 1000.0 },
      { clothingType: 3, biome: "Beach", tempChangeTicks: 800.0 },
      { clothingType: 3, biome: "Mesa", tempChangeTicks: 500.0 },
      { clothingType: 3, biome: "Jungle", tempChangeTicks: 160.0 },
      { clothingType: 3, biome: "Swampland", tempChangeTicks: 160.0 },
      { clothingType: 3, biome: "Hell", tempChangeTicks: 80.0 },
      { clothingType: 3, biome: "Desert", tempChangeTicks: 100.0 },
      { clothingType: 4, biome: "Cold Taiga", tempChangeTicks: -5000.0 },
      { clothingType: 4, biome: "Frozen", tempChangeTicks: -1000.0 },
      { clothingType: 4, biome: "Ice", tempChangeTicks: -1000.0 },
      { clothingType: 4, biome: "Beach", tempChangeTicks: 10000.0 },
      { clothingType: 4, biome: "Desert", tempChangeTicks: 400.0 },
      { clothingType: 4, biome: "Hell", tempChangeTicks: 100.0 },
      { clothingType: 4, biome: "Jungle", tempChangeTicks: 500.0 },
      { clothingType: 4, biome: "Mesa", tempChangeTicks: 1000.0 },
      { clothingType: 4, biome: "Savanna", tempChangeTicks: 2000.0 },
      { clothingType: 4, biome: "Swampland", tempChangeTicks: 1000.0 }
      ], "skyhighheroes:dyn/body_temperature", 400.0, "skyhighheroes:dyn/stelar_clothes");
  });
}