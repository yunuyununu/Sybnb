import React from 'react';

function SliderReviewItems({rv_idx, g_name, g_photo, rv_content, rv_date, rv_star}) {
    let loading = false;

    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let profile_src = "";
        if (g_photo !== "-") {
          const img_url = `http://localhost/static/images/guest/photo/${g_photo}`;
          profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
        } else {
          profile_src =
            "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
        }
        return (
            <div className='container'>
                <div className='row row-cols-2'>
                    <div className='col-12' style={{height:'90px', wordBreak : 'break-all'}}>{rv_content}</div>
                    <br />
                    <div className="col-2" dangerouslySetInnerHTML={{__html: profile_src}}></div> 
                    <div className="col-10">
                        <strong>{g_name}</strong><br />
                        {rv_date}
                    </div>
                </div>
            </div>
        )
    }
};

export default SliderReviewItems;