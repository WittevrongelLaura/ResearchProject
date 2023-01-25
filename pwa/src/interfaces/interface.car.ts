export interface Car {
    body: Body
    wheels: Wheels
    headlights: Headlights
    taillights: TailLights
    indicators: Indicators
    licenseplate: Licenseplate
    exhaust: Exhaust
}

interface Body {
    brand: string
    model: string
    year: number
}

interface Wheels {
    tires: Tires
    rims: Rims
}

interface Tires {
    brand: string
    model: string
    size: string
}

interface Rims {
    brand: string
    model: string
    size: string
}

interface Headlights {
    brand: string
    type: string
}

interface TailLights {
    brand: string
    type: string
}

interface Indicators {
    brand: string
    type: string
}

interface Licenseplate {
    front: string
    back: string
}

interface Exhaust {
    brand: string
    model: string
}