import React from 'react';
import { useNavigate } from "react-router";
//import moment from 'moment';

function HostReply({G_idx,H_idx,H_profile,H_name,Rp_date,Rp_content}) {
    const navigate = useNavigate();
    let loading = false;
    const url = `http://localhost/static/images/host/profile/${H_profile}`;
    //const date = new Date();
    //let rv = Rp_date;
    //rv = moment(date).format('YYYY년 MMMM Do');
    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let profile = "";
        if (H_profile !== "") {
          //const url = `http://localhost/static/images/guest/profile/${g_url}`;
          profile = `<img class='profile-img' src=${url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
        } else {
          profile =
            "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='60px' height='60px'/>";
        }
        return (
            <div className='container'>
                <div className='row row-cols-2'>
                    
                    <div className='col-12' style={{height:'90px', wordBreak : 'break-all'}}>{Rp_content}</div>
                    <br />
                    <div className="col-2" dangerouslySetInnerHTML={{__html: profile}} onClick={() => navigate(`/host/hotel/hostPage/${H_idx}`)}></div> 
                    <div className="col-10">
                        <strong>{H_name}</strong><br />
                        {Rp_date}
                    </div>
                </div>
            </div>
        )
    }
};

export default HostReply;