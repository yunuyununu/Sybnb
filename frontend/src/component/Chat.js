import React,{useEffect,useState,useRef} from 'react';
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Stomp } from "@stomp/stompjs";
import '../pages/guest/aa.css'
import '../asset/css/chat/Input.css'
import '../asset/css/chat/InfoBar.css'
import '../asset/css/chat/Message.css'
import BasicScrollToBottom from "react-scroll-to-bottom";

function Chat(props) {
    const [loading, setLoading] = useState(true);
    // const {hName} = useParams();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gEmail = cookies.get("g_email");

    const roomId = props.roomId;
    const ip = props.ip;
    const [messages, setMessages] = useState(null); // 채팅 메시지 상태
    const [message, setMessage] = useState(''); // 메시지 입력 상태
    const stompClient = useRef(null); // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
    const messagesEndRef = useRef(null); // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
    const [hName, sethName] = useState('');
    const [gName, setgName] = useState('');

    
    
    let type = '';
    if (gEmail != null) {
        type = gEmail.key;
    } else if (userInfo != null) {
        const hEmail = userInfo.h_email;
        type = hEmail;
    }
    
    const fetchMessages = () => {
        axios
          .get('http://localhost/chatroom/entrance?roomId='+roomId)
          .then((response) => {
            // setMessages((messages) => [...messages, response.data]);
            setMessages(response.data);
            setLoading(false);
            sethName(response.data[0].h_name);
            setgName(response.data[0].g_name);
          })
          .catch((error) => console.error("Failed to fetch chat messages.", error));
         
      };



    useEffect(() => {
        connect();
        fetchMessages();
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
      }, [roomId]); 
      
      useEffect(() => {
        scrollToBottom();
      }, [messages]); // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수


      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
      };

      const connect = () => {
        // const socket = new WebSocket(`ws://${ip}/ws`);
        const socket = new WebSocket(`ws://localhost:80/ws`);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
        stompClient.current.subscribe(`/sub/chatroom/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((messages) => [...messages, newMessage]);
          });
        });
      }; // 웹소켓 연결 설정


      const disconnect = () => {
        if (stompClient.current) {
          stompClient.current.disconnect();
        }
      };  // 웹소켓 연결 해제


      const sendGuestMessage = () => {
        if (!message.trim()) {
        } else {
            if (stompClient.current && message) {
                const messageObj = {
                  m_roomId: roomId,
                  m_sender: type,
                  m_message: message,
                };
                stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
                setMessage(""); // 입력 필드 초기화
              }
        }
      };// 새 메시지를 보내는 함수


    if(loading) {   
        return (
            <div>loading</div>
        )
        } else {
                    return (
                        <>
                        <div className='msg' style={{display: 'block', position: 'fix'}}>
                        <div className='infoBar'>
                            <div className='leftInnerContainer'>
                                {gEmail == null ? 
                                <h5>{gName}</h5>
                                : <h5>{hName}</h5>
                                }
                                
                            </div>
                        </div>
                        <BasicScrollToBottom className="messages">
                        {messages && messages.map((item) => (
                        item.m_test == 0 ?
                                item.m_sender == type ? 
                                <div className='messageContainer justifyEnd'>
                                <p className='sentText pr-10'>{}</p>
                                <div className='messageBox backgroundPurple'>
                                <p className='messageText colorDark'>{item.m_message}</p>
                                </div>
                            </div>
                            :    
                            <div className='messageContainer justifyStart'> 
                            <img src={gEmail!=null? (messages[0].h_profile == 'http://localhost/static/images/host/profile/-'? '/img/no-image.png' : messages[0].h_profile) : (messages[0].g_photo == 'http://localhost/static/images/guest/photo/-'? '/img/no-image.png' : messages[0].g_photo)} width='30px' height='30px' style={{marginTop: '7px', marginRight: '5px', borderRadius: '15px'}}/>
                            <div className='messageBox backgroundLight'>
                            <p className='messageText colorDark'>{item.m_message}</p>
                            </div>
                            <p className='sentText pl-10 '>{}</p>
                            </div> 
                        :
                        ''
                        ))}
                        <div ref={messagesEndRef}></div>
                        </BasicScrollToBottom>
                        <form className='form' onSubmit={(e) => {e.preventDefault();  sendGuestMessage(e);}}>
                        <input className='input' type='text' value={message} onChange={({ target: { value } }) => setMessage(value)}></input>
                        <button className='sendButton' onClick={e => sendGuestMessage(e)}><img src='/img/message.png' width='50px' height='30px' style={{paddingLeft: '6px'}}/></button>
                        </form>
                        </div>
                        </>
                    )
                
        }
}
export default Chat;