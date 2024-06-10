import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function confirm() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gEmail = cookies.get("g_email");
    const navigate = useNavigate();

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
}

export default confirm;