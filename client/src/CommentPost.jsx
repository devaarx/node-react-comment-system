import { useState } from 'react'

function CommentPost({
    users,
    postComment,
    selectedUser,
    handleSelectUser,
    isReply = false,
    parentTree,
}) {
    const [text, setText] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        if (!text.trim().length) return

        postComment({
            text: text.trim(),
            parent_tree: parentTree,
        })

        setText('')
    }

    return (
        <form onSubmit={onSubmit}>
            {!isReply && (
                <div className='mb-2'>
                    <span className='block text-sm font-medium leading-6 text-gray-900'>
                        Post a comment
                    </span>
                </div>
            )}
            <div className='mt-2 mb-4'>
                <textarea
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    rows='3'
                    required
                    value={text}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && e.metaKey) {
                            postComment({
                                text: e.target.value.trim(),
                                parent_tree: parentTree,
                            })
                            setText('')
                        }
                    }}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            <div className='flex items-start'>
                {!isReply && (
                    <div className='flex items-center gap-3'>
                        {selectedUser && (
                            <img
                                className='h-[2.5rem] w-[2.5rem] flex-none rounded-full bg-gray-50'
                                src={selectedUser?.avatar}
                                alt=''
                            />
                        )}
                        {users?.length ? (
                            <select
                                name='user'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                                onChange={(e) =>
                                    handleSelectUser(e.target.value)
                                }
                            >
                                {users.map((user) => (
                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >{`${user.first_name} ${user.last_name}`}</option>
                                ))}
                            </select>
                        ) : null}
                    </div>
                )}
                <button
                    type='submit'
                    className='flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto'
                >
                    {!isReply ? 'Post Comment' : 'Reply'}
                </button>
            </div>
        </form>
    )
}

export default CommentPost
