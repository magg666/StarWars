export {formatPlanet, formatPlanetDataForResidents, formatResidentData}

function formatDiameter(planet) {
    return planet['diameter'] >= 0 ? planet['diameter'] + ' km' : 'unknown'
}

function formatSurfaceWater(planet) {
    return planet['surface_water'] >= 0 ? planet['surface_water'] + ' %' : 'unknown'
}

function formatPopulation(planet) {
    return planet['population'] > 0 ? Number(planet['population']).toLocaleString('ja-JP') + ' people' : 'unknown'
}

function formatResidents(planet) {
    return planet['residents'].length > 0 ?
        `<button class="residents-button btn btn-outline-info" type="button">${planet['residents'].length} ${'resident(s)'}</button>`
        : `<button class="residents-button hidden"></button><span>No known residents</span>`
}

function formatHeight(resident) {
    return (resident['height'] >= 0) ? (resident['height'] / 100).toFixed(2) + ' m' : 'unknown'
}

function formatMass(resident) {
    return (resident['mass'] >= 0) ? resident['mass'] + ' kg' : 'unknown'
}

function formatGenderIcon(gender) {
    let icon = '';
    switch (gender) {
        case 'male':
            icon = 'mars';
            break;
        case 'female':
            icon = 'venus';
            break;
        default:
            icon = 'genderless';
    }
    return `<i class="fas fa-${icon}"></i>`;

}

function formatPlanet(planets) {
    return {
        next: planets.next,
        previous: planets.previous,
        planet: planets["results"].map(planet => {
            let name = planet['name'],
                diameter = formatDiameter(planet),
                climate = planet['climate'],
                terrain = planet['terrain'],
                surfaceWater = formatSurfaceWater(planet),
                population = formatPopulation(planet),
                residents = formatResidents(planet),
                url = planet['url'];
            return [name, diameter, climate, terrain, surfaceWater, population, residents, url]

        })
    }
}

function formatPlanetDataForResidents(planet) {
    return {
        name: planet['name'],
        residents: planet['residents'].sort()
    }
}

function formatResidentData(resident) {
    let name = resident['name'],
        height = formatHeight(resident),
        mass = formatMass(resident),
        hair_color = resident['hair_color'],
        skin_color = resident['skin_color'],
        eye_color = resident['eye_color'],
        birth_year = resident['birth_year'],
        gender = formatGenderIcon(resident['gender']);
    return [name, height, mass, hair_color, skin_color, eye_color, birth_year, gender];
}