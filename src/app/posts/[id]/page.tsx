"use client"

import { useParams } from 'next/navigation'
import { $comments, createComment, deleteComment, getComments, getOnePost } from '../../store/post'
import styles from '../styles/page.module.scss'
import userStyles from '../../components/user/styles/user.module.scss'
import { useEffect, useState } from 'react'
import User from '@/app/components/user'
import { Button, TextField, Typography } from '@mui/material'
import { $profile, userDataPreload } from '@/app/store/user'
import { useStore } from '@nanostores/react'
import { generateDMY } from '@/app/utils/date'

export default function Post() {
    const params = useParams()
    
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [commentText, setCommentText] = useState('')

    const comments = useStore($comments)
    const user = useStore($profile)

    async function fetchData() {
        const { title, body } = await getOnePost(params.id as string)
        await getComments(params.id as string)

        setTitle(title)
        setBody(body)
    }

    useEffect(() => {
        userDataPreload()
        fetchData()
    }, [])

    const handlePushComment = async () => {
        await createComment({
            postId: params.id as string,
            username: user.login,
            body: commentText,
            date: generateDMY('-'),
        })
    }

    const handleDeleteComment = async (id: string) => {
        await deleteComment(id)
    }

    return (
        <section className={styles["wrapper"]}>
            <User></User>
            <div className={styles["post"]}>
                <div className={styles["post-content"]}>
                    <Typography sx={{ fontSize: 32 }} color="text.secondary">
                        {title}
                    </Typography>
                    <div dangerouslySetInnerHTML={{__html: body}} />
                </div>
                <div className={styles["post-comments"]}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                        <TextField
                            sx={{ width: '600px', marginBottom: '12px' }}
                            placeholder="Comment text..."
                            multiline
                            rows={2}
                            maxRows={20}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button sx={{ width: '600px' }} size="medium" color="success" variant="outlined" onClick={handlePushComment}>Comment</Button>
                    </div>
                    {(comments && comments.length > 0) && comments.map(comment => <div key={comment.id} className={styles["post-comments-item"]}>
                        <div className={userStyles["user-avatar-comment"]}></div>
                        <div className={userStyles["user-info"]}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary">
                                {comment.username}
                            </Typography>
                            <div style={{ width: '450px', }}>
                                <Typography sx={{ fontSize: 18 }}>
                                    {comment.body}
                                </Typography>
                            </div>
                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                {comment.date}
                            </Typography>
                        </div>
                        { (user.login === comment.username) && <Button size="small" color="error" onClick={() => handleDeleteComment(comment.id)}>Remove</Button> }
                    </div>)}
                    {(comments.length === 0) && <Typography sx={{ fontSize: 18 }}>No comments yet. Let it first!</Typography>}
                </div>
            </div>
        </section>
    )
}
