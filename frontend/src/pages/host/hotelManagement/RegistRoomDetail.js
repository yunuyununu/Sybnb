import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function RegistRoomDetail(props) {
  const [rdo, setRadio] = useState("Y");
  const roomType = useRef();
  const capacity = useRef();
  const area = useRef();
  const beds = useRef();
  const price = useRef();
  const imgRef1 = useRef();

  // function handleRdoChange(e) {
  //   setRadio(e.target.value);
  // }

  const [state, setState] = useState({
    roomType : "",
    capacity : "",
    area : "",
    beds : "",
    non_smoking : "Y",
    price : "",
    dImg1 : "",
    dImg2 : "",
    dImg3 : ""
  });

  const [file, setFile] = useState({
    dImg1 : "",
    dImg2 : "",
    dImg3: ""
  });

  const handleChangeState = (e) => {

    const fileArr = e.target.files;
    let fileURLs = [];
    let file;
    let d_img1_name = "-";
    let d_img2_name = "-";
    let d_img3_name = "-";

    for (let i = 0; i < imgRef1.current.files.length; i++) {

      if(imgRef1.current.files[0] != null){
        d_img1_name = imgRef1.current.files[0].name;
      }
      if(imgRef1.current.files[1] != null){
        d_img2_name = imgRef1.current.files[1].name;
      }
      if(imgRef1.current.files[2] != null){
        d_img3_name = imgRef1.current.files[2].name;
      }

    }
    setState({
      ...state,
      [e.target.name] : e.target.value,
      "dImg1_name" : d_img1_name,
      "dImg2_name" : d_img2_name,
      "dImg3_name" : d_img3_name
    });

    for (let i = 0; i < imgRef1.current.files.length; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onloadend = () => {        
        fileURLs[i] = reader.result;

        if(imgRef1.current.files[0] != null){
          d_img1_name = imgRef1.current.files[0].name;
        }
        if(imgRef1.current.files[1] != null){
          d_img2_name = imgRef1.current.files[1].name;
        }
        if(imgRef1.current.files[2] != null){
          d_img3_name = imgRef1.current.files[2].name;
        }
        setFile({
            ...file,
            "dImg1" : fileURLs[0],
            "dImg1_name" : d_img1_name,
            "dImg2" : fileURLs[1],
            "dImg2_name" : d_img2_name,
            "dImg3" : fileURLs[2],
            "dImg3_name" : d_img3_name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const insertData = () => {
    if(roomType.current.value == '싱글룸'){
      if(roomType.current.value == "" || capacity.current.value == "" || area.current.value == "" || beds.current.value == ""
      || price.current.value == "" || imgRef1.current.value == ""){
          Swal.fire({
              icon : 'warning',
              text: '입력되지 않은 값이 있습니다.',
              confirmButtonText: '확인'
            }).then((result) => {
              if(result.isConfirmed){
                return;
              }
            });
      } else if(imgRef1.current.files.length < 3) {
        Swal.fire({
          icon : 'warning',
          text: '싱글룸은 사진 3장 필수입니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if(result.isConfirmed){
            return;
          }
        });
      } else if(imgRef1.current.files.length > 3){
        Swal.fire({
          icon : 'warning',
          text: '사진은 최대 3장까지 첨부가능합니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if(result.isConfirmed){
            return;
          }
        });
      } else {
        props.insertData(state, file);
      }
    } else {
        if(roomType.current.value == "" || capacity.current.value == "" || area.current.value == "" || beds.current.value == ""
        || price.current.value == "" || imgRef1.current.value == ""){
            Swal.fire({
                icon : 'warning',
                text: '입력되지 않은 값이 있습니다.',
                confirmButtonText: '확인'
              }).then((result) => {
                if(result.isConfirmed){
                  return;
                }
              });
      } else if(imgRef1.current.files.length > 3) {
        Swal.fire({
          icon : 'warning',
          text: '사진은 최대 3장까지 첨부가능합니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if(result.isConfirmed){
            return;
          }
        });
      } else {
        props.insertData(state, file);
      }
    }
  }

    return (
      <>
        <div className="modal_container" style={{ paddingTop: "30px" }}>
          <h3 className="text-bold mb-30">
            &nbsp;객실유형
          </h3>
          <hr />
          <div className="card-style mb-30">
            <div style={{ textAlign: "left" }}>
              <table className="tbl">
                <colgroup>
                  <col width={"20%"} />
                  <col width={"30%"} />
                  <col width={"20%"} />
                  <col width={"30%"} />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>객실 유형</th>
                    <td>
                        <select
                          name="roomType"
                          ref={roomType}
                          value={props.roomType}
                          onChange={handleChangeState}
                        >
                          <option value="" selected disabled hidden>선택해주세요</option>
                          <option value={'싱글룸'}>싱글룸</option>
                          <option value={'더블룸'}>더블룸</option>
                          <option value={'패밀리룸'}>패밀리룸</option>
                          <option value={'스위트룸'}>스위트룸</option>
                        </select>
                    </td>
                    <th colSpan={1}>수용 인원</th>
                    <td colSpan={1}>
                      <input 
                        type="number" 
                        min={0} 
                        style={{border:'none'}}
                        name="capacity"
                        ref={capacity}
                        value={props.capacity} 
                        onChange={handleChangeState}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1} style={{ width: "25%" }}>
                      객실 면적
                    </th>
                    <td colSpan={1}>
                      <input 
                        type="number" 
                        min={0} 
                        style={{border:'none'}}
                        name="area"
                        ref={area}
                        value={props.area} 
                        onChange={handleChangeState}
                      />
                    </td>
                    <th colSpan={1}>침대 수</th>
                    <td colSpan={1}>
                      <input 
                          type="number" 
                          min={0} 
                          style={{border:'none'}}
                          name="beds"
                          ref={beds}
                          value={props.beds} 
                          onChange={handleChangeState}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1} style={{ width: "25%" }}>금연실 여부</th>
                    <td colSpan={1}>
                      <div>
                      <input
                          className="form-check-input"
                          type="radio"
                          name="non_smoking"
                          value="Y"
                          defaultChecked={true}
                          onChange={handleChangeState}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          Y
                        </label>
                        &nbsp;&nbsp;
                        <input
                          className="form-check-input"
                          type="radio"
                          name="non_smoking"
                          value="N"
                          onChange={handleChangeState}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          N
                        </label>
                      </div>
                    </td>
                    <th colSpan={1}>가격</th>
                    <td colSpan={3}>
                      <input 
                          type="number" 
                          min={0} 
                          style={{border:'none'}}
                          name="price"
                          ref={price}
                          value={props.price} 
                          onChange={handleChangeState}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진</th>
                    <td colSpan={3}>
                      <input
                        ref={imgRef1}
                        multiple
                        className="form-control"
                        type="file"
                        name="dImg1"
                        value={props.dImg1}
                        onChange={handleChangeState}
                        //onChange={(e)=>{imgRef1.current.files.length < 3 ? handleChangeState(e.target.files) : alert("Noooooo"); return false;}}
                        accept=".jpg,.jpeg,.png,"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-30" style={{ textAlign: "center" }}>
              <button className="main-btn" onClick={insertData}>
                &nbsp;&nbsp;&nbsp;등록&nbsp;&nbsp;&nbsp;
              </button>
           
          </div>
        </div>
      </>
    );
  }

export default RegistRoomDetail;