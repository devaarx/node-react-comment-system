import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import CommentPost from './CommentPost'
import Comment from './Comment'

const baseUrl = 'http://localhost:4000'

function App() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [comments, setComments] = useState([])

    function handleSelectUser(userId) {
        const selectedUser = users?.find((user) => user.id === userId)
        setSelectedUser(selectedUser)
    }

    async function fetchUsers() {
        const { data } = await axios.get(baseUrl + '/user/all')
        if (data?.length) {
            setUsers(data)
            setSelectedUser(data[0])
        }
    }

    async function fetchComments() {
        const { data } = await axios.get(baseUrl + '/comment/all')
        if (data?.length) {
            setComments(data)
        }
    }

    async function postComment(comment) {
        await axios.post(baseUrl + '/comment', {
            ...comment,
            user_id: selectedUser?.id,
        })
        fetchComments()
    }

    function renderComments(comments, parentTree) {
        return comments.map((comment) => {
            const tree = [...(parentTree || []), comment?.id]
            return (
                <Fragment key={comment?.id}>
                    <Comment
                        comment={comment}
                        postComment={postComment}
                        parentTree={tree}
                    />
                    {comment?.replies?.length ? (
                        <div className='ml-[3.2rem]'>
                            {renderComments(comment.replies, tree)}
                        </div>
                    ) : null}
                </Fragment>
            )
        })
    }

    useEffect(() => {
        fetchUsers()
        fetchComments()
    }, [])

    return (
        <div className='max-w-4xl m-auto p-4 mt-6'>
            <CommentPost
                users={users}
                postComment={postComment}
                selectedUser={selectedUser}
                handleSelectUser={handleSelectUser}
            />
            <div className='mt-12'>
                <span className='block text-sm font-medium leading-6 text-gray-900'>
                    {comments.length} comments
                </span>
                <div className='mt-6'>{renderComments(comments)}</div>
            </div>
        </div>
    )
}

export default App
