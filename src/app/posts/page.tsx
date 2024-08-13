"use client"

import { Card, CardContent, Typography, CardActions, Button, CardHeader, Pagination, Modal, TextField } from "@mui/material"
import { getPosts, addPost, $posts, $total, removePost, IPost, updatePost } from "../store/post"
import styles from "./styles/page.module.scss"
import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import User from "../components/user"
import { convertToRaw, EditorState, convertFromHTML, ContentState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html"
import { useRouter } from "next/navigation"
import { userDataPreload } from "../store/user"

const Posts: React.FC = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)

    useEffect(() => {
        userDataPreload()
        getPosts(page)
    }, [page])

    const posts = useStore($posts)
    const total = useStore($total)

    //Editor
    const [editPostId, setEditPostId] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')

    // Modal
    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = (post: IPost) => {
        const { id, title, body } = post

        setEditPostId(id)
        setEditTitle(title)

        // Convert HTML string to Editor state
        const blocksFromHTML = convertFromHTML(body)
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        
        setEditorState(EditorState.createWithContent(contentState))
        setContent(body)

        setModalOpen(true)
    };
    const handleModalClose = () => setModalOpen(false)

    const handleAddPost = async () => {
        await addPost({ title: "New post", body: "Body text here..." })
    }

    const handleRemovePost = async (id: string) => {
        await removePost(id)
    }

    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState)
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        setContent(draftToHtml(rawContentState))
    }

    const handleTogglePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

    const savePost = async (post: IPost) => {
        const update = await updatePost(post)
        handleModalClose()
    }

    return (
        <div className={styles["wrapper"]}>
            <User></User>
            <section className={styles["posts"]}>
                <div className={styles["posts-wrapper"]}>
                    <div className={styles["posts-content"]}>
                        {(posts && posts.length > 0) && posts.map(item => <Card key={item.id} sx={{ width: 300, height: 130 }} className={styles["posts-content-card"]}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', rowGap: '6px', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                    { item.title }
                                </Typography>
                                <div>
                                    <Button size="small" color="success" onClick={() => handleModalOpen(item)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => handleRemovePost(item.id)}>Remove</Button>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => router.push(`/posts/${item.id}`)}>Read</Button>
                            </CardActions>
                        </Card>)}
                        {(posts.length === 0) && <Typography sx={{ fontSize: 24}}>No posts in the board. Add new?</Typography>}
                    </div>
                    <div className={styles["posts-add"]} onClick={handleAddPost}><span>+</span></div>
                </div>
                <Pagination count={total} page={page} color="primary" onChange={handleTogglePage} />
            </section>

            {/* POST EDITOR */}
            <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                >
                    <Card sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 5,
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        width: '50%',
                        height: 600
                    }}
                    >
                        <TextField
                            id="field-title"
                            label="Title"
                            variant="standard"
                            value={editTitle}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEditTitle(event.target.value);
                            }}
                        />
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            editorStyle={{
                                height: '370px'
                            }}
                            onEditorStateChange={handleEditorStateChange}
                            mention={{
                                separator: " ",
                                trigger: "@",
                                suggestions: [
                                    { text: "APPLE", value: "apple" },
                                    { text: "BANANA", value: "banana", url: "banana" },
                                    { text: "CHERRY", value: "cherry", url: "cherry" },
                                    { text: "DURIAN", value: "durian", url: "durian" },
                                    { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                                    { text: "FIG", value: "fig", url: "fig" },
                                    { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
                                    { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
                                ]
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => savePost({ id: editPostId, title: editTitle, body: content })}
                        >
                            Сохранить
                        </Button>
                    </Card>
                </Modal>
        </div>
    )
}

export default Posts
