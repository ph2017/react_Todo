export function save(key, value){
    window.localStorage.setItem(key, value);
}

export function read(key){
    window.localStorage.getItem(key);
}