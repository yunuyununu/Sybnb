import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/css/user.css";
import "./asset/css/main.css";

import Main from "./Main";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GuestLogin from "./pages/guest/member/login";
import SearchEmail from "./pages/guest/member/searchEmail";
import SearchPw from "./pages/guest/member/searchPw";
import HotelDetail from "./pages/host/HotelDetail";
import HotelImage from "./pages/host/hotelDetailSection/HotelImage"
import HostPage from "./pages/host/HostPage";
import Account from "./pages/guest/member/Account";
import Profile from "./pages/guest/member/Profile";
import Pay from "./pages/guest/member/Pay";
import PayReceipt from "./pages/guest/member/PayReceipt";
import GuestInfo from "./pages/guest/member/GuestInfo";
import PayItem from "./pages/guest/member/PayItem";
import WishItem from "./pages/guest/wish/wishItem";
import WishList from "./pages/guest/wish/wishList";
import Wish from "./pages/guest/wish/wish";
import Recent from "./pages/guest/wish/recent";
import RecentItem from "./pages/guest/wish/recentItem";
import Reservation from "./pages/guest/travel/reservation";
import Order from "./pages/guest/Order";
import Coupon from "./pages/guest/member/coupon";
import LastReservItem from "./pages/guest/travel/lastReservItem";
import PreReservItem from "./pages/guest/travel/preReservItem";
import LastReservDetail from "./pages/guest/travel/lastReservDetail";
import ReservRevItem from "./pages/guest/travel/reservRevItem";
import PreReservDetail from "./pages/guest/travel/preReservDetail";
import CancelReserv from "./pages/guest/travel/cancelReserv";
import UpdateReserv from "./pages/guest/travel/updateReserv";
import Notice from "./component/Notice";
import NoticeDetail from "./component/NoticeDetail";
import Message from "./component/Message";
import WriteReview from "./pages/guest/travel/WriteReview"; // guest:review 등록
import EditReview from "./pages/guest/member/EditReview"; // guest:review 수정

// admin 계정
import Alogin from "./pages/admin/alogin";
import Amain from "./pages/admin/amain";
import AGuest from "./pages/admin/aguest";
import Ahost from "./pages/admin/ahost";
import AHotel from "./pages/admin/ahotel";
import AHoteldetail from "./pages/admin/ahoteldetail";
import NoticeList from "./pages/admin/notice/alist";
import Awrite from "./pages/admin/notice/awrite";
import Adetail from "./pages/admin/notice/adetail";
import Anoticedetail from "./pages/admin/notice/anoticedetail";


// host 계정
import HostLogin from "./pages/host/login/Login";
import SearchHostEmail from "./pages/host/login/SearchEmail";
import SearchHostPw from "./pages/host/login/SearchPw";
import HostAccount from "./pages/host/hostAccount/HostAccount";
import EditHostInfo from "./pages/host/hostAccount/EditHostInfo";
import MyHotelList from "./pages/host/hotelManagement/MyHotelList";
import RegistHotel from "./pages/host/hotelManagement/RegistHotel";
import RegistHotelDetail from "./pages/host/hotelManagement/RegistHotelDetail";
import EditHotel from "./pages/host/hotelManagement/EditHotel";
import ManageOrders from "./pages/host/orders/ManageOrders";


import WriteReply from "./pages/host/hostAccount/WriteReply";
import EditReply from "./pages/host/hostAccount/EditReply";

function App() {
  console.warn = function no_console() {};

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/guest/login" element={<GuestLogin />} />
          <Route path="/guest/searchEmail" element={<SearchEmail />} />
          <Route path="/guest/searchPw" element={<SearchPw />} />
          <Route path="/guest/Account" element={<Account />} />
          <Route path="/guest/Profile" element={<Profile />} />
          <Route path="/guest/Pay" element={<Pay />} />
          <Route path="/host/hotel/hotelDetail/:HoIdx/:dIdx" element={<HotelDetail />} />
          <Route path="/host/hotel/HotelImage" element={<HotelImage />} />
          <Route path="/host/hotel/hostPage/:HIdx" element={<HostPage />} />
          <Route path="/guest/GuestInfo" element={<GuestInfo />} />
          <Route path="/guest/PayItem" element={<PayItem />} />
          <Route path="/guest/PayReceipt" element={<PayReceipt />} />
          <Route path="/guest/wishItem" element={<WishItem />} />
          <Route path="/guest/wishList" element={<WishList />} />
          <Route path="/guest/wish" element={<Wish />} />
          <Route path="/guest/recent" element={<Recent />} />
          <Route path="/guest/recentItem" element={<RecentItem />} />
          <Route path="/guest/reservation" element={<Reservation />} />
          <Route path="/guest/Order" element={<Order />} />
          <Route path="/guest/coupon" element={<Coupon />} />
          <Route path="/guest/preReservItem" element={<PreReservItem />} />
          <Route path="/guest/lastReservItem" element={<LastReservItem />} />
          <Route path="/guest/lastReservDetail/:OIdx" element={<LastReservDetail />} />
          <Route path="/guest/preReservDetail/:OIdx" element={<PreReservDetail />} />
          <Route path="/guest/reservRevItem" element={<ReservRevItem />} />
          <Route path="/guest/cancelReserv/:OIdx" element={<CancelReserv />} />
          <Route path="/guest/updateReserv/:OIdx" element={<UpdateReserv />} />
          <Route path="/component/Notice" element={<Notice />} />
          <Route path="/component/NoticeDetail" element={<NoticeDetail />} />
          <Route path="/component/Message/:room/:Hname" element={<Message />} />
          <Route path="/component/Message" element={<Message />} />



          {/* admin 계정 */}
          <Route path="/admin/alogin/:aId" element={<Alogin />} />
          <Route path="/admin/amain/:aId" element={<Amain />} />
          <Route path="/admin/ahost/:aId" element={<Ahost />} />
          <Route path="/admin/aguest/:aId" element={<AGuest />} />
          <Route path="/admin/ahotel/:aId" element={< AHotel/>}/>
          <Route path="/admin/ahoteldetail/:hoIdx" element = {<AHoteldetail />}/>
          <Route path="/admin/notice/alist/:aId" element={<NoticeList />} />
          <Route path="/admin/notice/awrite/:aId" element={<Awrite />} />
          <Route path="/admin/notice/adetail/:n_idx" element={<Adetail />} />
          <Route path="/admin/notice/anoticedetail/:n_idx" element={<Anoticedetail/>}/>


          {/* host 계정 */}
          <Route path="/host/login" element={<HostLogin />} />
          <Route path="/host/searchEmail" element={<SearchHostEmail />} />
          <Route path="/host/searchPw" element={<SearchHostPw />} />
          <Route path="/api/host/account/:userIdx" element={<HostAccount />} />
          <Route path="/host/edit/:userIdx" element={<EditHostInfo />} />
          <Route path="/host/hotel/MyHotelList" element={<MyHotelList />} />
          <Route path="/host/hotel/editHotel" element={<EditHotel />} />
          <Route path="/host/hotel/registHotel" element={<RegistHotel />} />
          <Route path="/host/hotel/registHotelDetail" element={<RegistHotelDetail />} />
          <Route path="/api/order/manage/list/:userIdx" element={<ManageOrders />} />
          
          {/* host 리뷰 관리 */}
          <Route path="/host/account/manage/review" element={<WriteReply />} />
          <Route path="/host/account/manage/reply" element={<EditReply />} />

          {/* guest 리뷰 등록/수정 */}
          <Route path="/guest/write" element={<WriteReview />} />
          <Route path="/guest/edit" element={<EditReview />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;