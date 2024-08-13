export interface IPostDto {
    title: string;
    body: string;
}

export interface ICommentDto {
    postId: string;
    username: string;
    body: string;
    date: string;
}
