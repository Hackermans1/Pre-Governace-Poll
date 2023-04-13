import React from "react"
import { useEffect, useState } from "react"

import "./Comment.css"
import dataConst from "../constants/data.json"
import axios from "axios"
import ProfilePicture from "../components/ProfilePicture"
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Comment({
    discussion_url,
    content,
    author,
    likes,
    dislikes,
    replies,
}) {
    const pythonApiPrefix = dataConst.pythonApiPrefix

    const [commentLikes, setCommentLikes] = React.useState(likes)
    const [commentDislikes, setCommentDislikes] = React.useState(dislikes)
    const [commentReplies, setCommentReplies] = React.useState(replies)

    // form to add new comment
    const [newCommentContent, setNewCommentContent] = React.useState("")

    useEffect(() => {
        //post comment to backend
    }, [])

    return (
        <div className="commentContainer">
            <div className="commentContainer">
                <div className="commentLEFT">
                    <div className="profilePicture">
                        <ProfilePicture address={author} />
                    </div>
                </div>
                <div className="commentRIGHT">
                    <div className="commentAuthor">
                        {author.slice(0, 6)}...{author.slice(author.length - 4)}
                    </div>
                    <div className="commentContent">{content}</div>
                    <div className="commentFooter">
                        <div className="commentLikes">
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className="reactionContainer"
                            />
                            {likes}
                        </div>
                        <div className="commentDislikes">
                            <FontAwesomeIcon
                                icon={faThumbsDown}
                                className="reactionContainer"
                            />
                            {dislikes}
                        </div>
                        <div className="commentReplies">
                            <FontAwesomeIcon
                                icon={faComment}
                                className="reactionContainer"
                            />
                            {replies.length}
                        </div>
                        <div className="commentReply"><div>REPLY</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
