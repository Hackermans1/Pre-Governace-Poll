import React from "react"
import { useEffect, useState } from "react"
import Comment from "./Comment.jsx"
import axios from "axios"
import dataConst from "../constants/data.json"
import ProfilePicture from "./ProfilePicture.jsx"

function Discussion({ proposalUrl,account }) {
    // proposalUrl: Ipfs api endpoint prefix + ipfs hash of proposal
    
    const pythonApiPrefix = dataConst.pythonApiPrefix
    const discussionEndpoint = `${pythonApiPrefix}/discussions/${proposalUrl}`
    const [comments, setComments] = useState([])
    const [newCommentContent, setNewCommentContent] = useState("")
    console.log(account)


    async function getComments() {
        console.log("getting comments", discussionEndpoint)

        const response = await axios({
            method: "get",
            url: discussionEndpoint,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })

        console.log("got comments", response.data)
        let comments = response.data.discussion.comments
     
        comments = comments.map((comment) => {
            comment.author = comment.author_address // renaming
            // adding mock likes, dislikes, and replies to comments data
            comment.likes = 0
            comment.dislikes = 0
            comment.replies = []
            return comment
        })

        setComments(comments)
    }

    async function handlePostComment(e) {

        //TODO URL
        const hi = "www.proposal1.com"
        
        e.preventDefault()
        try {
            console.log(
                `trying to post comment to discussion : ${discussionEndpoint}`
            )
            
            const response = await axios.post(discussionEndpoint, {
                content: newCommentContent,
                author_address: account, //TODO: get author address from MM
            })

            console.log("posted comment", response.data)

            // clear form
            setNewCommentContent((prev) => "")
            getComments()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //TODO:  get comments from backend server using proposal url on load
        getComments()
        console.log(comments)
    }, [])

    return (
        <div className="discussionContainer">
            {/* TODO: pass whatever  */}
        <div className="headingCommentsTop">Comments</div>
            <form onSubmit={handlePostComment}>
                <div className="commentContainer">
                    <div className="commentLEFT">
                        <div className="profilePicture"><ProfilePicture address={account}/></div>
                    </div>
                    <div className="commentRIGHT">
                       

                        <div className="commentContent">
                            <input
                                type="text"
                                placeholder="Tell other's what you think"
                                value={newCommentContent}
                                onChange={(e) =>
                                    setNewCommentContent(e.target.value)
                                }
                                className="inputContainer"
                            />
                        </div>
                        <div className="commentFooter">
                            <div className="commentPost">
                                <button className="commentButton" type="submit">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {comments
                .map(({ author, content, likes, dislikes, replies }, id) => (
                    <Comment
                        //TODO: get this from url
                        key = {id}
                        discussion_url="www.proposal1.com"
                        content={content}
                        author={author}
                        likes={likes}
                        dislikes={dislikes}
                        replies={replies}
                    />
                ))
                .reverse()}
        </div>
    )
}

export default Discussion
