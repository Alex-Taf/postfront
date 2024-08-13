import { $host } from "@/app/http";
import { IUserDto } from "./dto/index.dto";

export const userSignUp = async (userDto: IUserDto) => {
    return await $host.post('/user/signup/', userDto)
}

export const userSignIn = async (userDto: IUserDto) => {
    return await $host.post('/user/signin', userDto)
}

export const userCheck = async (userId: string) => {
    console.log(userId)
    return await $host.get(`/user/${userId}`)
}
