function filterLocation (assets) {
  const locations = ["Seleccione locación"]
  assets.forEach(asset => {
    if(!locations.includes(asset.location)){
      locations.push(asset.location)
    }
  });
  return {
    locations
  }
}

module.exports = {filterLocation}

/*
array > objeto > propiedad > valor 
guardo todos los valores sin repetir 
y devuelvo un objeto literal con las propiedades
count
rows
locations
*/