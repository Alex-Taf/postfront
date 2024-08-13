import { atom } from "nanostores"
import { commentCreate, commentDelete, commentsGet, postCreate, postDelete, postGet, postGetOne, postUpdate } from "../api/post";
import { ICommentDto, IPostDto } from "../api/post/dto/index.dto";

export interface IPost {
    id: string;
    title: string;
    body: string;
}

export interface IComment {
    id: string;
    postId: string;
    username: string;
    body: string;
    date: string;
}

export const $posts = atom<IPost[]>([])
export const $comments = atom<IComment[]>([])
export const $total = atom(0)
export const $limit = atom(6)

export async function getOnePost(id: string) {
    const post = await postGetOne(id)
    return post.data;
}

export async function getPosts(page: number) {
    const posts = await postGet(page, $limit.get())
    $total.set(posts.data.totalPages)
    $posts.set([...posts.data.docs])
}

export async function addPost(newPost: IPostDto) {
    const post = await postCreate(newPost)
    $total.set(post.data.totalPages)
    $posts.set([post.data.post, ...$posts.get()])
}

export async function updatePost(post: IPost) {
    const { id, title, body } = post
    const updated = await postUpdate(id, { title, body })

    const posts = $posts.get()
    const filtered = posts.filter((item) => item.id !== id)

    $posts.set([updated.data, ...filtered])
}

export async function removePost(id: string) {
    const remove = await postDelete(id)
    const filtered = $posts.get().filter((post: IPost) => post.id !== id)
    
    $posts.set([...filtered])
}

export async function getComments(postId: string) {
    const comments = await commentsGet(postId)
    $comments.set([...comments.data])
}

export async function createComment(comment: ICommentDto) {
    const createdComment = await commentCreate(comment)
    $comments.set([createdComment.data, ...$comments.get()])
}

export async function deleteComment(id: string) {
    const remove = await commentDelete(id)

    const filtered = $comments.get().filter((comment: IComment) => comment.id !== id)
    $comments.set([...filtered])
}
