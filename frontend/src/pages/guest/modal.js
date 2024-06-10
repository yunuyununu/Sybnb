
import './modall.css';
import React, {useState} from "react";


function Modall(props) {
    const [modal, setModal] = useState(false);

    function closeModal() {
        props.closeModal();
        
    }

    return (
        <div className='Modal_a' onClick={closeModal}>
            <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                <button id = 'modalCloseBtn' onClick={closeModal}>
                    X
                </button>
                {props.children}
            </div>
        </div>
    );
}

export default Modall;