

function SelectGH() {
    return (
        <div className="container min-vh-100">
            <Link to="/guest/join">
            <div className="card-style1" style={{paddingRight: "30px"}}>
                <img src="/img/guest.png"/>게스트
            </div>
            </Link>
            <div className="card-style1" style={{paddingLeft: "30px"}}>
                <img src="/img/host.png"/>호스트
            </div>
            </div>
        
    )
}

export default SelectGH;