// import React from 'react'
// import AdminnLogin from './components/admin/AdminnLogin'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import AboutUs from './components/common/AboutUs'
import ContactUs from './components/common/ContactUs'
import AdminLogin from './components/admin/AdminLogin'
import WorkerLogin from './components/worker/WorkerLogin'
import UserLogin from './components/user/UserLogin'
import UserReg from './components/user/UserReg'
import Feedback from './components/user/Feedback'
import AdminDashboard from './components/admin/AdminDashboard'
import UserDashboard from './components/user/UserDashboard'
import WorkerDashboard from './components/worker/WorkerDashboard'
import AllContacts from './components/admin/AllContacts'
import AllUsers from './components/admin/AllUsers'
import AllFeedbacks from './components/admin/AllFeedbacks'
import AddWorker from './components/admin/AddWorker'
import AdminEditProfile from './components/admin/AdminEditProfile'
import UserEditProfile from './components/user/UserEditProfile'
import WorkerEditProfile from './components/worker/WorkerEditProfile'
import ChangePassword from './components/admin/ChangePassword'
import ProfileUpload from './components/admin/ProfileUpload'
import UserImageUpload from './components/user/UserImageUpload'
import WorkerImageUpload from './components/worker/WorkerImageUpload'
import PathologyChatbotPage from './components/user/PathologyChatbotPage'
import AddTest from './components/admin/AddTest'
import AddCamp from './components/admin/AddCamp'
import ShowCamps from './components/common/ShowCamps'
import TestList from './components/common/TestList'
import SampleCollection from './components/user/SampleCollection'
import SampleCollectorDashboard from './components/worker/SampleCollectorDashboard'
import AllRequest from './components/worker/AllRequest'
import AssignedRequest from './components/worker/AssignedRequest'
import RequestStatus from './components/user/RequestStatus'
import SampleReport from './components/user/SampleReport'
import BookTest from './components/user/BookTest'
import BookedTests from './components/user/BookedTest'
import Payment from './components/user/Payment'
import AllTestPendingBookingRequest from './components/worker/AllTestPendingBookingRequest'
import ViewTestBookingStatus from './components/user/ViewTestBookingStatus'
import ViewAllConfirmedRequest from './components/worker/ViewAllConfirmedRequest'
import UploadTestReport from './components/worker/UploadTestReport'
import Contact from './components/user/Contact'
import HomePage from './components/common/HomePage'
import AllWorkers from './components/admin/AllWorkers'

function PathMapper() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>
          <Route path='/contact' element={<ContactUs />}></Route>
          <Route path='/show-camps' element={<ShowCamps />}></Route>
          <Route path='/show-tests' element={<TestList />}></Route>
          <Route path='/home-page' element={<HomePage />}></Route>


          <Route path='/admin/admin-login' element={<AdminLogin />}></Route>
          <Route path='/admin/admin-dashboard' element={<AdminDashboard />}></Route>
          <Route path='/admin/edit-profile' element={<AdminEditProfile />}></Route>
          <Route path='/admin/change-password' element={<ChangePassword />}></Route>
          <Route path='/admin/profile-upload' element={<ProfileUpload />}></Route>
          <Route path='/admin/all-contacts' element={<AllContacts />}></Route>
          <Route path='/admin/all-users' element={<AllUsers />}></Route>
          <Route path='/admin/all-workers' element={<AllWorkers />}></Route>
          <Route path='/admin/all-feedbacks' element={<AllFeedbacks />}></Route>
          <Route path='/admin/add-worker' element={<AddWorker />}></Route>
          <Route path='/admin/add-test' element={<AddTest />}></Route>
          <Route path='/admin/add-camp' element={<AddCamp />}></Route>




          <Route path='/user/user-login' element={<UserLogin />}></Route>
          <Route path='/user/edit-profile' element={<UserEditProfile />}></Route>
          <Route path='/user/user-registration' element={<UserReg />}></Route>
          <Route path='/user/user-dashboard' element={<UserDashboard />}></Route>
          <Route path='/user/user-image-upload' element={<UserImageUpload />}></Route>
          <Route path='/user/user-feedback' element={<Feedback />}></Route>
          <Route path='/user/user-chatbot' element={<PathologyChatbotPage />}></Route>
          <Route path='/user/sample-collection' element={<SampleCollection />}></Route>
          <Route path='/user/sample-request-status' element={<RequestStatus />}></Route>
          <Route path='/user/sample-report' element={<SampleReport />}></Route>
          <Route path='/user/book-test' element={<BookTest />}></Route>
          <Route path='/user/booked-test' element={<BookedTests />}></Route>
          <Route path='/user/pay-online' element={<Payment />}></Route>
          <Route path='/user/booking-status' element={<ViewTestBookingStatus/>}></Route>
          <Route path='/user/contact-us' element={<Contact/>}></Route>


          <Route path='/worker/worker-login' element={<WorkerLogin />}></Route>
          <Route path='/worker/edit-profile' element={<WorkerEditProfile />}></Route>
          <Route path='/worker/worker-dashboard' element={<WorkerDashboard />}></Route>
          <Route path='/worker/worker-image-upload' element={<WorkerImageUpload />}></Route>
          <Route path='/worker/sample-collector-dashboard' element={<SampleCollectorDashboard />}></Route>
          <Route path='/worker/sample-request' element={<AllRequest />}></Route>
          <Route path='/worker/assigned-request' element={<AssignedRequest />}></Route>
          <Route path='/worker/pending-booking-request' element={<AllTestPendingBookingRequest/>}></Route>
          <Route path='/worker/confirmed-booking-request' element={<ViewAllConfirmedRequest/>}></Route>
          <Route path='/worker/upload-test-report' element={<UploadTestReport/>}></Route>



        </Routes>
      </BrowserRouter>

    </>
  )
}
export default PathMapper