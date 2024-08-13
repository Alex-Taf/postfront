import { map } from 'nanostores'
import { userSignIn, userSignUp } from '../api/user'
import { jwtDecode } from 'jwt-decode'
import { StorageController } from '../utils/storage';

export interface IUserBody {
    login: string;
    password: string;
}

interface IUserMap {
    id: string;
    login: string;
    auth: boolean;
}

export interface IDecoded {
    login: string;
    id: string;
    iat: number;
}

export const $profile = map<IUserMap>({
    id: '',
    login: '',
    auth: false
})

export async function signIn(body: IUserBody) {
    try {
        const user = await userSignIn(body)

        const decoded = jwtDecode<IDecoded>(user.data.token)
        $profile.setKey('id', decoded.id)
        $profile.setKey('login', decoded.login)

        const storage = new StorageController()
        storage.set('id', decoded.id)
        storage.set('login', decoded.login)
        storage.set('token', user.data.token)
        storage.set('auth', 'true')

        $profile.setKey('auth', true)

        return 'Authorized'
    } catch (err) {
        return err
    }
}

export async function signUp(body: IUserBody) {
    const newUser = await userSignUp(body)
    return newUser.data
}

export function signOut() {
    const storage = new StorageController()

    storage.remove('token')  
    storage.remove('login')
    storage.set('auth', 'false')

    $profile.setKey('id', '')
    $profile.setKey('login', '')
    $profile.setKey('auth', false)
}

export function userDataPreload() {
    const storage = new StorageController()

    $profile.setKey('id', storage.get('id'))
    $profile.setKey('login', storage.get('login'))
    $profile.setKey('auth', storage.get('auth'))
}
