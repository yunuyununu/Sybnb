import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from "react-router-dom";


function Chatbot() {
    const navigate = useNavigate();

    const reserv = () => {
        navigate('/guest/reservation');
    }

    const wish = () => {
        navigate('/guest/wish');
    }

    const proRev = () => {
        navigate('/guest/Profile');
    }

    const info = () => {
        navigate('/guest/Guestinfo');
    }

    const pay = () => {
        navigate('/guest/Pay');
    }

    const benefit = () => {
        navigate('/guest/Coupon');
    }

    const steps = [
        {
            id: '1',
            message: '안녕하세요 바로가기 챗봇입니다',
            trigger: '2',
        },
        {
            id: '2',
            options: [
            { value: 1, label: '숙소', trigger: '3' },
            { value: 2, label: '회원', trigger: '4' },
            { value: 3, label: '결제', trigger: '5' },
            ],
        },
        {
            id: '3',
            options: [
            { value: 1, label: '예약내역 확인', trigger: () => {reserv()}},
            { value: 2, label: '위시리스트', trigger: () => {wish()} },
            { value: 3, label: '뒤로 이동', trigger: '2' },
            ],
        },
        {
            id: '4',
            options: [
            { value: 1, label: '프로필 및 리뷰', trigger: () => {proRev()} },
            { value: 2, label: '회원 정보 수정', trigger: () => {info()} },
            { value: 3, label: '뒤로 이동', trigger: '2' },
            ],
        },
        {
            id: '5',
            options: [
            { value: 1, label: '결제내역 및 수단', trigger:  () => {pay()} },
            { value: 2, label: '쿠폰 및 포인트', trigger: () => {benefit()} },
            { value: 3, label: '뒤로 이동', trigger: '2' },
            ],
        },

        ]
    
    
        const theme = {
            background: '#f5f8fb',
            fontFamily: 'Helvetica Neue',
            headerBgColor: '#ceb8f0',
            headerFontColor: '#fff',
            headerFontSize: '15px',
            botBubbleColor: '#ceb8f0',
            botFontColor: '#000',
            userBubbleColor: '#fff',
            userFontColor: '#000',
        }
    
    return (
        <ThemeProvider theme={theme}>
        <ChatBot
            steps={steps}
            hideHeader={false}
            headerTitle="ChatBot"
            width='700px'
            botAvatar='/img/chatbot.png'
            hideSubmitButton={true}
          placeholder={"채팅이 불가능한 채널입니다."}
        />
      </ThemeProvider>
    )
}

export default Chatbot;
