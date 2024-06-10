import React from 'react';
import { useNavigate } from 'react-router-dom';

function SliderReviewItems({idx, ho_idx, d_idx, ho_img, ho_name, ho_address}) {
    const navigate = useNavigate();
    let loading = false;

    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let profile_src = "";
        if (ho_img !== "-") {
          const img_url = `http://localhost/static/images/host/hotel/${ho_img}`;
          profile_src = `<img src=${img_url} style="width:500px; height:250px; border-radius:20px;" />`;
        } else {
          profile_src =
            "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
        }
        return (
            <div className='container' onClick={() => navigate(`/host/hotel/hotelDetail/${ho_idx}/${d_idx}`)}>
                <div className="col-2" dangerouslySetInnerHTML={{__html: profile_src}}></div>
                <br />
                <div className="col-10">
                    <strong>{ho_name}</strong><br />
                    {ho_address}
                </div>
            </div>
        )
    }
};

export default SliderReviewItems;