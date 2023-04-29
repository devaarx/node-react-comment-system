import express from 'express'
import bodyParser from 'body-parser'
import uniqid from 'uniqid'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

let comments = []
const users = [
    {
        id: 'djpua5chlgrrwpxj',
        first_name: 'Alice',
        last_name: 'Smith',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: 'djpua5chlgrrwpxk',
        first_name: 'Bob',
        last_name: 'Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 'djpua5chlgrrwpxl',
        first_name: 'Charlie',
        last_name: 'Brown',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: 'djpua5chlgrrwpxm',
        first_name: 'David',
        last_name: 'Lee',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: 'djpua5chlgrrwpxn',
        first_name: 'Eve',
        last_name: 'Taylor',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
]

app.get('/user/all', (req, res) => {
    res.json(users)
})

app.get('/comment/all', (req, res) => {
    res.json(comments)
})

app.post('/comment', (req, res) => {
    const { text, parent_tree, user_id } = req.body // text: string, parent_tree: string[]

    const user = users.find((user) => user.id === user_id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    // create new comment object
    const newComment = {
        id: uniqid(),
        text,
        user,
        replies: [],
    }

    if (parent_tree?.length) {
        function findNestedObjectByIds(nestedObjects, ids) {
            const currentId = ids[0]
            const currentObject = nestedObjects.find(
                (obj) => obj.id === currentId
            )

            if (!currentObject) return

            if (ids.length === 1) {
                currentObject.replies.unshift(newComment)
                return
            }

            findNestedObjectByIds(currentObject.replies, ids.slice(1))
        }

        findNestedObjectByIds(comments, parent_tree)
    } else {
        comments.unshift(newComment)
    }

    res.json(newComment)
})

app.listen(4000, () => {
    console.log('Server started on port 4000 🚀')
})
