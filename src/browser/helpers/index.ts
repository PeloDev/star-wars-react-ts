export function importAllDirImages(r: any) {
    let images: any = {};
    r.keys().map((item: any, idx: Number) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function fetchCharacterImgByIdx(idx: Number) {

}