import axios from '../util/axios'
//---------------------------------

const user = JSON.parse(localStorage.getItem('user-login'))
const userId = user?.id;

//------------------------------

const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

//------------------------------

const configFormData = {
    headers: {
        "Content-Type": "multipart/form-data",
    }
}
//.....................................................................

//user-Apis
export const getRandomNovelAPI = () => axios.get('/getRandom', config);
export const getAllNovelsForUsersAPI = () => axios.get('/getAllNovels-user', config);
export const getAllGenresAPI = () => axios.get('/admin/getAllGenres', config);

export const getNovelDetailsWithIdAPI = (id) => axios.get(`/novelWithId/${id}`, config);
export const getChapterAPI = (id, number, userId) =>
    axios.get(`/getChapter?novelId=${id}&chapterNumber=${number}&userId=${userId}`, config);

export const getMostViewedNovelsAPI = (url) => axios.get(url, config);
export const gridePostAPI = (url) => axios.get(`${url}?userId=${userId}`, config);
export const getWalletAPI = () => axios.get(`/getWallet?userId=${userId}`, config);
export const checkGCoinSystemAPI = (novelId) => axios.get(`/check-GCoinSystem?NovelId=${novelId}`, config);
export const checkPayToReadAPI = (novelId, chapterNo, userId) =>
    axios.get(`/checkPayToRead?novelId=${novelId}&chapterNo=${chapterNo}&userId=${userId}`, config);
export const getAllMessageAPI = (novelId) => axios.get(`/all-message?novelId=${novelId}`, config);
export const getCommunityAPI = (userId) => axios.get(`/get-community?userId=${userId}`, config);


export const userSignUpPostAPI = (body) => axios.post('/signup', body, config);
export const verifyOtpPostAPI = (body) => axios.post('/verifyUserOtp', body, config);
export const resendOtpAPI = (email) => axios.post('/resend-otp', { email }, config);

export const getFilteredNovelsAPI = (body) => axios.post('/filterNovels-user', body, config);
export const RatingPostAPI = (body) => axios.post('/rateNovel', body, config);
export const addNovelToLibraryAPI = (novelId) => axios.post('/add-To-library', { novelId, userId }, config);
export const newMessagePostAPI = (body) => axios.post('/send-message', body, config);
export const changePasswordRequestAPI = (body) => axios.post('/changePassword-request', body, config);
export const changePasswordAPI = (body) => axios.post('/changePassword', body, config);
export const editProfileAPI = (body) => axios.post('/edit-profile', body, config);
export const PayToReadPostAPI = (body) => axios.post('/PayToReadPost', body, config);
export const joinCommunityAPI = (body) => axios.post('/join-community', body, config);

//...............................................................................................

//AUTHOR
export const getAuthorNovelsAPI = () => axios.get(`/author/getAuthorNovels/${userId}`, config);
export const authorGetGenresAPI = () => axios.get('/author/getGenres', config);
export const getChapterEditDetailsAPI = (novelId, chapterId) =>
    axios.get(`/author/edit-chapter-details?novelId=${novelId}&chapterId=${chapterId}`, config);
export const getNovelDetailByIdAPI = (novelId) => axios.get(`/author/getNovelDetailById?novelId=${novelId}`, config);


export const cancelNovelAPI = (novelId) => axios.post('/author/cancel-novel', { novelId }, config);
export const deleteChapterAPI = (body) => axios.post('/author/delete-chapter', body, config);
export const authorNovelCreateAPI = (title, formData) => axios.post(`/author/create/${title}`, formData, configFormData);
export const authorAddChapterAPI = (body) => axios.post('/author/addChapter', body, config);
export const paymentEligibleCheckAPI = (body) => axios.post('/author/payment-Eligible-Check', body, config);
export const PostEditChapterAPI = (body) => axios.post('/author/edit-chapter', body, config);
export const authorNovelEditAPI = (id, title, formData) => axios.post(`/author/edit-novel/${id}/${title}`, formData, configFormData);
