import { $authHost } from "@/app/http";
import { ICommentDto, IPostDto } from "./dto/index.dto";

export const postGet = async (page: number, limit: number) => {
    return await $authHost.get(`/post/get?page=${page}&limit=${limit}`)
}

export const postGetOne = async (id: string) => {
    return await $authHost.get(`/post/get/${id}`)
}

export const postCreate = async (postDto: IPostDto) => {
    return await $authHost.post('/post/create/', postDto)
}

export const postUpdate = async (id: string, postDto: IPostDto) => {
    return await $authHost.patch(`/post/update/${id}`, postDto)
}

export const postDelete = async (id: string) => {
    return await $authHost.delete(`/post/delete/${id}`)
}

export const commentCreate = async (commentDto: ICommentDto) => {
    return await $authHost.post(`/comment/create`, commentDto)
}

export const commentDelete = async (id: string) => {
    return await $authHost.delete(`/comment/delete/${id}`)
}

export const commentsGet = async (postId: string) => {
    return await $authHost.get(`/comment/get/${postId}`)
} 
