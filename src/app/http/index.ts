import axios from "axios"
import { StorageController } from "../utils/storage"

const storage = new StorageController()

const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL
})

const authInterceptor = (config: Record<string, unknown> | null) => {
    if (!config) {
        config = {};
    }

    if (!config.headers) {
        config.headers = {};
    }

    config.headers.authorization = `Bearer ${storage.get('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
