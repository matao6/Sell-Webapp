export function saveToLocal (id, key, value) {
    let seller = window.localStorage.__seller__
    if (!seller) {
        seller = {}
        seller[id] = {}
        // console.log(seller.id + '1')
    } else {
        seller = JSON.parse(seller)
        if (!seller[id]) {
            seller[id] = {}
            // console.log(seller.id + '2')
        }
    }
    seller[id][key] = value
    window.localStorage.__seller__ = JSON.stringify(seller)
    // console.log(seller.id + '3')
}

export function loadFromLocal (id, key, def) {
    let seller = window.localStorage.__seller__
    if (!seller) {
        return def
    }
    seller = JSON.parse(seller)[id]
    if (!seller) {
        return def
    }
    let ret = seller[key]
    return ret || def
}
