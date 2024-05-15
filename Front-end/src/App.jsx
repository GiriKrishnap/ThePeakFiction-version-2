//..............................................................................................

import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/loading';

//LINKS.........................................................................................

import {
  AuthorNovelDetails, Login, PayToReadPageUrl, PaymentSuccessURL, Signup, VerifyOptPageUrl, adminAuthorManagement,
  adminDashboard, adminGenreManagement, adminLogin, adminNovelManagement, adminUserManagement, AuthorAddChapter,
  authorCreate, authorHome, authorNovels, chatPageUrl, communityPageUrl, filter, getUpdatedUrl, trendingUrl,
  myLibraryUrl, newPasswordUrl, novelDetailedView, profileUrl, readNovel, readerHome, AuthorEditChapter, AuthorEditNovel,
} from './util/constants';


//Pages.........................................................................................

//user pages
const LoginPage = lazy(() => import('./pages/UserPages/LoginPage'));
const SignupPage = lazy(() => import('./pages/UserPages/SignupPage'))
const ReaderHomePage = lazy(() => import('./pages/UserPages/HomePage'))
const FilterNovelsPage = lazy(() => import('./pages/UserPages/FilterPage'))
const NovelDetailedPage = lazy(() => import('./pages/UserPages/NovelDetailedView'))
const ReadNovel = lazy(() => import('./pages/UserPages/ReadNovelPage'))
const ProfilePage = lazy(() => import('./pages/UserPages/ProfilePage'))
const UpdatedPage = lazy(() => import('./pages/UserPages/Updated'))
const TrendingPage = lazy(() => import('./pages/UserPages/TrendingPage'))
const LibraryPage = lazy(() => import('./pages/UserPages/LibraryPage'))
const CommunityPage = lazy(() => import('./pages/UserPages/CommunityPage'))
const ChatPage = lazy(() => import('./pages/UserPages/ChatPage'))
const VerifyOptPage = lazy(() => import('./pages/UserPages/VerifyOtpPage'))
const NewPasswordPage = lazy(() => import('./pages/UserPages/NewPasswordPage'))
const PayToReadPage = lazy(() => import('./pages/UserPages/PayToReadPage'))

//author
const AuthorHomePage = lazy(() => import('./pages/AuthorPages/AuthorHome'))
const AuthorCreatePage = lazy(() => import('./pages/AuthorPages/AuthorCreateNovel'))
const AuthorNovelPage = lazy(() => import('./pages/AuthorPages/AuthorNovels'))
const AuthorNovelDetailPage = lazy(() => import('./pages/AuthorPages/AuthorNovelDetailsPage'))
const AuthorAddChapterPage = lazy(() => import('./pages/AuthorPages/AuthorAddChapterPage'))
const EditChapterPage = lazy(() => import('./pages/AuthorPages/EditChapterPage'))
const EditNovelPage = lazy(() => import('./pages/AuthorPages/EditNovel'))

//admin pages
const AdminLoginPage = lazy(() => import('./pages/AdminPages/adminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminPages/adminDashboardPage'))
const AdminUserManagement = lazy(() => import('./pages/AdminPages/adminUsersPage'))
const AdminAuthorManagement = lazy(() => import('./pages/AdminPages/adminAuthorPage'))
const AdminGenrePage = lazy(() => import('./pages/AdminPages/adminGenrePage'))
const AdminNovelPage = lazy(() => import('./pages/AdminPages/adminNovelsPage'))

//404 notFound
const NotFound404 = lazy(() => import('./pages/404-Page'))
//payment Success
const PaymentSuccessPage = lazy(() => import('./pages/UserPages/paymentSuccess'))



//........................................................................................

function App() {

  return (

    <div className="App">
      <div><Toaster /></div>
      <Router>

        <Suspense fallback={<Loading />}>

          <Routes>

            {/* UserPart */}
            <Route exact path={Login} element={<LoginPage />} />
            <Route exact path={Signup} element={<SignupPage />} />
            <Route exact path={readerHome} element={<ReaderHomePage />} />
            <Route exact path={filter} element={<FilterNovelsPage />} />
            <Route exact path={novelDetailedView} element={<NovelDetailedPage />} />
            <Route exact path={readNovel} element={<ReadNovel />} />
            <Route exact path={profileUrl} element={<ProfilePage />} />
            <Route exact path={PaymentSuccessURL} element={<PaymentSuccessPage />} />
            <Route exact path={getUpdatedUrl} element={<UpdatedPage />} />
            <Route exact path={trendingUrl} element={<TrendingPage />} />
            <Route exact path={myLibraryUrl} element={<LibraryPage />} />
            <Route exact path={communityPageUrl} element={<CommunityPage />} />
            <Route exact path={chatPageUrl} element={<ChatPage />} />
            <Route exact path={VerifyOptPageUrl} element={<VerifyOptPage />} />
            <Route exact path={newPasswordUrl} element={<NewPasswordPage />} />
            <Route exact path={PayToReadPageUrl} element={<PayToReadPage />} />


            {/* AuthorPart */}
            <Route exact path={authorHome} element={<AuthorHomePage />} />
            <Route exact path={authorCreate} element={<AuthorCreatePage />} />
            <Route exact path={authorNovels} element={<AuthorNovelPage />} />
            <Route exact path={AuthorNovelDetails} element={<AuthorNovelDetailPage />} />
            <Route exact path={AuthorAddChapter} element={<AuthorAddChapterPage />} />
            <Route exact path={AuthorEditChapter} element={<EditChapterPage />} />
            <Route exact path={AuthorEditNovel} element={<EditNovelPage />} />


            {/* AdminPart */}
            <Route exact path={adminLogin} element={<AdminLoginPage />} />
            <Route exact path={adminDashboard} element={<AdminDashboardPage />} />
            <Route exact path={adminUserManagement} element={<AdminUserManagement />} />
            <Route exact path={adminAuthorManagement} element={<AdminAuthorManagement />} />
            <Route exact path={adminGenreManagement} element={<AdminGenrePage />} />
            <Route exact path={adminNovelManagement} element={<AdminNovelPage />} />

            <Route path='*' exact element={<NotFound404 />} />

          </Routes>
        </Suspense>
      </Router>

    </div >

  );

}

//...............................................................................................
export default App;
