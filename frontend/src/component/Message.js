import React,{useEffect,useState} from 'react';
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import '../pages/guest/aa.css'
import Chat from './Chat';
import Chatbot from './chatbot';
import Swal from "sweetalert2";



function Message() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gEmail = cookies.get("g_email");
    const [roomId, setRoomId] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [ip, setIp] = useState('');
    const {room} = useParams();
    const [check, setCheck] = useState(1);
    const navigate = useNavigate();

    
    // if((gEmail == null || gEmail == '') && (userInfo == null || userInfo == '')) {
    //     Swal.fire({
    //         text: "로그인 후 이용 가능합니다.",
    //         showCancelButton: false,
    //         confirmButtonText: '확인',
    //     }).then((result) => {
    //         if(result.isConfirmed) {
    //             navigate("/");
    //         }
    //     });
    // }
    
    
    let sender = '';
    let type = '';
    if (gEmail != null && gEmail != '') {
        sender = gEmail.key;
        type = 'guest';
    } else if (userInfo != null && userInfo != '') {
        const hEmail = userInfo.h_email;
        sender = hEmail;
        type = 'host';
    }
    

    useEffect(() => {
            const form = new FormData();
            form.append('sender', sender);
            form.append('type', type);
            fetch('http://localhost/chatroom/list', {
                method: 'post',
                body: form,
            })
            .then(response => {
                return response.json();
            })
            .then(data => {    
                setData(data);
                setLoading(false);
                if (data.dto.length != 0) {
                    if (room != null && room != '') {
                        setRoomId(room);
                    } else {
                        setRoomId(data.dto[0].m_roomId);
                    }
                    setData(data);
                    setLoading(false);
                } else if (data.dto.length == 0){
                    setLoading(false);
                    if (gEmail != null) {
                        setCheck(0);
                    } else {
                        setComment('메시지가 없습니다');
                        setCheck(3);
                    }         
                }
            })
    },[]);
    
    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        if((gEmail == null || gEmail == '') && (userInfo == null || userInfo == '')) {
            Swal.fire({
                text: "로그인 후 이용 가능합니다.",
                showCancelButton: false,
                confirmButtonText: '확인',
            }).then((result) => {
                if(result.isConfirmed) {
                    navigate("/");
                }
            });
        }
        return (
            <>
            <div style={{marginLeft: '300px', paddingTop: '50px',height: '720px'}}>
            <h3 className="text-bold"> <img src="/img/msg.png" width="35px" height="35px"/>
                &nbsp; 메시지</h3>
                <hr></hr>
            <br/>
                <div className="card-styleee mb-30" style={{width: '300px', height: '600',float: 'left', marginRight: '30px', overflowY: 'auto'}}>
                    <p>{comment}</p>
                    { gEmail != null ? 
                    <div onClick={() => { setCheck(0)}}>
                    <div style={{float: 'left', marginRight: '10px'}}><img src='/img/chatbot.png' width='30px' height='30px' /></div>
                    <p style={{fontSize: '20px'}}>챗봇</p> 
                    </div>
                    : 
                    ''
                    }
                    <hr></hr>
                {data.dto.map((item) => (
                    <div className='mes' onClick={() =>  { setRoomId(item.m_roomId); setIp(item.h_ip); setCheck(1);
                    // if(gIdx.key !== null) {
                    //     setsss('http://localhost/chatroom/g_entrance?g_idx=' + gIdx.key + '&idx=' + item.m_h_idx);
                    // } else if(userInfo !== null) {
                    //     const hIdx = userInfo.h_idx;
                    //     setsss('http://localhost/chatroom/h_entrance?h_idx=' + hIdx.key+ '&idx=' + item.m_g_idx);
                    // }   
                    }}> 
                    <div style={{float: 'left', marginRight: '10px'}}><img src={gEmail==null ? (item.g_photo == 'http://localhost/static/images/guest/photo/-' ? '/img/no-image.png' : item.g_photo) : (item.h_profile == 'http://localhost/static/images/host/profile/-'? '/img/no-image.png' : item.h_profile) } width='30px' height='30px' /></div>
                    <p style={{fontSize: '20px'}}>{gEmail==null ? item.g_name : item.h_name}<span style={{float:'right', fontSize: '13px'}}>{item.m_send_date}</span></p> 
                    <p style={{fontSize: '15px', color: 'grey'}}>{item.m_message}</p>
                    <hr/>
                    </div>
                ))}
            </div>
            
            {check != 1 ? 
                check == 3? 
                ''
                :
                <div style={{position:'absolute', left: '610px'}}>
                <Chatbot></Chatbot>
                </div>
                
            :      
                <Chat roomId= {roomId} ip={ip}></Chat>
            }
            </div>
            
            </>
        )
    }
}




export default Message;