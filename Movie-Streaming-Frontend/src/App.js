import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'remixicon/fonts/remixicon.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import UserRegistration from './Components/User/UserRegistration';
import UserLogin from './Components/User/UserLogin';
import SupportLogin from './Components/Support/SupportLogin';
import AdminLogin from './Components/Admin/AdminLogin';
import Footer from './Components/Footers/Footer';
import LandingPage from './Components/Common/LandingPage';
import ScrollToTop from "./Components/Common/ScrollToTop";
import UserHome from "./Components/User/UserHome";
import './App.css';
import LandingNavbar from "./Components/Navbars/LandingNavbar";
import UserNavbar from "./Components/Navbars/UserNavbar";
import ForgotPassword from "./Components/Common/ForgotPassword";
import UserViewSingleVideo from "./Components/User/UserViewSingleVideo";
import SupportAddMovies from "./Components/Support/SupportAddMovies";
import UserAddComplaints from "./Components/User/UserAddComplaints";
import UserPreferLanguages from "./Components/User/UserPreferLanguages";
import UserPreferGenre from "./Components/User/UserPreferGenre";
import AdminCall from "./Components/Admin/AdminCall";
import SupportCall from "./Components/Support/SupportCall";
import UserViewSubscriptionPlans from "./Components/User/UserViewSubscriptionPlans";
import UserSubscriptionPayment from "./Components/User/UserSubscriptionPayment";
import MovieByGenre from "./Components/User/MovieByGenre";
import PlayVideo from "./Components/Common/PlayVideo";
import UserViewWishlisht from "./Components/User/UserViewWishlisht";
import UserProfile from "./Components/User/UserProfile";
import UserViewMyPlans from "./Components/User/UserViewMyPlans";
import UserEditProfile from "./Components/User/UserEditProfile";
import UserChat from "./Components/User/UserChat";
import UserAddReview from "./Components/User/UserAddReview";
import SupportViewReports from "./Components/Support/SupportViewReports";



function App() {
  return (
    <BrowserRouter basename="movie_streaming" >
    <ScrollToTop/>
    <div>
      <Routes>

        {/* User Routes */}
        <Route path='/' element={[<LandingNavbar/>,<LandingPage/>]} /> 
        <Route path='/user_registration' element={[<LandingNavbar/>,<UserRegistration/>]} />
        <Route path='/user_login' element={[<LandingNavbar/>,<UserLogin/>]} />
        <Route path='/user_forgot_password' element={[<LandingNavbar/>,<ForgotPassword activeUser='user' />]} />
        <Route path='/user_prefer_languages' element={[<UserPreferLanguages/>]} />
        <Route path='/user_prefer_genre' element={[<UserPreferGenre/>]} />
        <Route path='/user_home' element={[<UserNavbar/>,<UserHome/>]} />
        <Route path='/user_view_movie_by_genre/:genre' element={[<UserNavbar/>,<MovieByGenre/>]} />
        <Route path='/user-view-single-movie/:id/:img' element={[<UserNavbar/>,<UserViewSingleVideo/>]} />
        <Route path='/user_add_complaint' element={[<UserNavbar/>,<UserAddComplaints/>]} />
        <Route path='/user_view_subscription' element={[<UserNavbar/>,<UserViewSubscriptionPlans/>]} />
        <Route path='/user_subscription_payment/:cost/:id' element={[<UserNavbar/>,<UserSubscriptionPayment/>]} />
        <Route path='/user_play_movie/:id/:type' element={[<UserNavbar/>,<PlayVideo userType='user' />]} />
        <Route path='/user_view_wishlist' element={[<UserNavbar/>,<UserViewWishlisht/>]} />
        <Route path='/user_profile' element={[<UserNavbar/>,<UserProfile/>]} />
        <Route path='/user_edit_profile' element={[<UserNavbar/>,<UserEditProfile/>]} />
        <Route path='/view_my_plans' element={[<UserNavbar/>,<UserViewMyPlans/>]} />
        <Route path='/user_chat' element={[<UserNavbar/>,<UserChat/>]} />
        <Route path='/user_single_chat/:id/:type' element={[<UserNavbar/>,<UserChat/>]} />
        <Route path='/user_add_review/:id' element={[<UserNavbar/>,<UserAddReview />]} /> 


        {/* Support Routes  */}
        <Route path='/support_login' element={[<LandingNavbar/>,<SupportLogin/>]} />
        <Route path='/support_dashboard' element={[<SupportCall type='dashboard' />]} />
        <Route path='/support_add_movies' element={[<SupportCall type='add_movies' />]} />
        <Route path='/support_view_movies' element={[<SupportCall type='view_movies' />]} />
        <Route path='/support_view_single_movie/:id/:img' element={[<SupportCall type='view_movie_by_id' />]} />
        <Route path='/support_add_cast/:id' element={[<SupportCall type='add_cast' />]} />
        <Route path='/support_play_movie/:id/:type' element={[<SupportCall type='support_play_movie' />]} />
        <Route path='/support_edit_movie/:id' element={[<SupportCall type='support_edit_movie' />]} />
        <Route path='/support_view_complaints' element={[<SupportCall type='support_view_complaints' />]} />
        <Route path='/support_chat/:id' element={[<SupportCall type='support_chat' />]} />
        <Route path='/support_view_reviews/:id' element={[<SupportCall type='view_review' />]} />
        <Route path='/support_view_users' element={[<SupportCall type='view_users' />]} />
        <Route path='/support_chat' element={<SupportViewReports/>} />
        <Route path='/support_view_recently_played_movies/:id' element={[<SupportCall type='recently_played_movies' />]} />


        {/* Admin Routes */}
        <Route path='/admin_login' element={<AdminLogin/>} />
        <Route path='/admin_dashboard' element={<AdminCall type='dashboard' />} />
        <Route path='/admin_view_movie_req' element={<AdminCall type='movie_req' />} />
        <Route path='/admin_view_single_movie_req/:id/:img' element={<AdminCall type='movie_req_by_id' />} />
        <Route path='/admin_view_approved_movies' element={<AdminCall type='approved_movies' />} />
        <Route path='/admin_view_single_approved_movies/:id/:img' element={<AdminCall type='approved_movies_by_id' />} />
        <Route path='/admin_play_video/:id/:type' element={<AdminCall type='admin_play_movie' />} />
        <Route path='/admin_add_subscription_plan' element={<AdminCall type='add_subscription' />} />
        <Route path='/admin_view_subscription_plan' element={<AdminCall type='view_subscription' />} />
        <Route path='/admin_edit_subscription_plan/:id' element={<AdminCall type='edit_subscription' />} />
        <Route path='/admin_view_complaints' element={<AdminCall type='view_complaints' />} />
        <Route path='/admin_view_users' element={<AdminCall type='view_users' />} />
        <Route path='/admin_view_reviews/:id' element={[<AdminCall type='view_review' />]} />
        <Route path='/admin_view_recently_played_movies/:id' element={[<AdminCall type='recently_played_movies' />]} />

      </Routes>
    </div>
    <Footer/>

    </BrowserRouter>
    
  );
}

export default App;
