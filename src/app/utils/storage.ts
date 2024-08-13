import {stringify} from './stringify'
import {parse} from './parse'

const ls = (typeof window !== "undefined" ? window.localStorage : false) as Storage

export class StorageController {
    set(key: string, value: string) {
        ls.setItem(key, stringify(value))
    }

    get(key: string) {
        return parse(ls.getItem(key))
    }

    remove(key: string) {
        ls.removeItem(key)
    }
}
