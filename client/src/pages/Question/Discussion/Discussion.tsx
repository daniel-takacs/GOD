import React, { FC, useState, useEffect } from "react";
import './Discussion.scss'
import _ from 'lodash'
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { uid } from "utils/helpers";
import {Message, addMessage, allMessages, getDiscussionThunk} from "redux/reducers/chatReducer";
import {sendMessage} from "utils/socket";
import {User, userSelector} from "redux/reducers/userReducer";
import SendIcon from '@mui/icons-material/Send';
import Truncate from 'react-truncate';


interface DiscussionProps {
  questionId: string;
  messages: Array<Message>;
}

let tempMessageId: string | boolean = false;

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {
  const { questionId } = props;

  const dispatch = useAppDispatch();

  const user: User = useAppSelector(userSelector)
  const messages: Message[] = useAppSelector(allMessages)

  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    dispatch(getDiscussionThunk(questionId))
  }, [])

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    const message: string = ev.target.elements.message.value;

    if (message) {
      const msg = formatMessage(message);
      if (!!msg) {
        // dispatch(addMessage(msg));
        sendMessage(msg)
        tempMessageId = msg.id;
      }
      ev.target.reset()
    }
  }

  function formatMessage(message: string): Message | null {
    try {
      return {
        // messageId,
        id: uid(),
        text: message,
        creatorId: user.id,
        creatorDisplayName: user.displayName,
        parentId: questionId,
        parentType: "question",
        error: false,
      };
    } catch (err) {
      console.error(err);
      return null
    }
  }


  function elapsedTime(date: any){
    //convert to unix the message timestamp
    let myDate = new Date(date)
    let timestamp = myDate.getTime() 
    let secondsOld = Math.floor(timestamp / 1000)

    //get the time now
    let timeNow = new Date()
    let recentTimeTimestamp = timeNow.getTime()
    let secondsNow = Math.floor(recentTimeTimestamp / 1000) 
    
    const difference = secondsNow - secondsOld
    let output=''

    if (difference < 60) {
      return output = `${difference} seconds ago`
    } else if (difference < 3600) {
      // Less than an hour has passed:
      return output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
      // Less than a day has passed:
      return output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
      // Less than a month has passed:
      return output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
      // Less than a year has passed:
      return output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
      // More than a year has passed:
      return output = `${Math.floor(difference / 31449600)} years ago`;
  }

  }

  const readMoreHandler = ()=> {
    setShowMore(showMore => !showMore)
    console.log(showMore)
  }

  return (
      <div className="chat">
        <div className="messages">
          {_.map(messages, (msg: any, i: number) => (
              <div key={`message-${i}`} className="message">
                <div className="creator">{msg.roles.creator.displayName} - {elapsedTime(msg.date)}</div>
                <div className="content">{msg.text}</div>
              </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="chat-input">
            <input type="text" name="message" autoComplete="off" placeholder="add message" />
            <button type="submit">
              <SendIcon/>
            </button>
          </div>
        </form>
      </div>
  )
}

export default Discussion
