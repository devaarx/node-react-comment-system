import { useState } from 'react'
import CommentPost from './CommentPost'

function Comment({ comment, postComment, parentTree }) {
    const [showreply, setShowreply] = useState(false)
    const { text, user } = comment

    return (
        <div className='mb-6 flex gap-4'>
            <img
                className='h-[2.2rem] w-[2.2rem] min-w-[2.2rem] flex-none rounded-full bg-gray-50'
                src={user?.avatar}
                alt=''
            />
            <div className='flex-1'>
                <p className='text-slate-800'>{text}</p>
                <div className='mt-3'>
                    {showreply ? (
                        <CommentPost
                            isReply={true}
                            parentTree={parentTree}
                            postComment={(comment) => {
                                postComment(comment)
                                setShowreply(false)
                            }}
                        />
                    ) : (
                        <button
                            className='text-slate-500 text-sm flex gap-2 items-center hover:text-slate-400'
                            onClick={() => setShowreply(true)}
                        >
                            <svg
                                viewBox='0 0 24 24'
                                width='14'
                                height='14'
                                stroke='currentColor'
                                strokeWidth='2'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <polyline points='9 14 4 9 9 4'></polyline>
                                <path d='M20 20v-7a4 4 0 0 0-4-4H4'></path>
                            </svg>
                            <span>Reply</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Comment
