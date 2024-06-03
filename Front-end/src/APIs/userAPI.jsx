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

const configForm = {
    headers: {
        "Content-Type": "multipart/form-data",
    }
}


//user-Apis
export const getRandomNovelAPI = () => axios.get('/get-random', config);
export const getAllNovelsForUsersAPI = (page) => axios.get(`/get-all-novels?page=${page}`, config);
export const getAllGenresAPI = () => axios.get('/admin/get-all-genres', config);

export const getNovelDetailsWithIdAPI = (id) => axios.get(`/get-novel/${id}`, config);
export const getChapterAPI = (id, number) => axios.get(`/get-chapter/${id}/${number}/${userId}`, config);
export const textToSpeechAPI = (body) => axios.post(`/text-to-speech`, body, { responseType: 'arraybuffer' });


export const getMostViewedNovelsAPI = (url) => axios.get(url, config);
export const gridePostAPI = (url, page) => axios.get(`${url}?userId=${userId}&page=${page}`, config);
export const getWalletAPI = () => axios.get(`/get-wallet?userId=${userId}`, config);
export const checkGCoinSystemAPI = (novelId) => axios.get(`/check-gcoin-system?novelId=${novelId}`, config);
export const checkPayToReadAPI = (novelId, chapNo) => axios.get(`/check-pay-to-read/${novelId}/${chapNo}/${userId}`, config);
export const getAllMessageAPI = (novelId) => axios.get(`/all-message?novelId=${novelId}`, config);
export const getCommunityAPI = () => axios.get(`/get-community?userId=${userId}`, config);


export const userSignUpPostAPI = (body) => axios.post('/signup', body, config);
export const verifyOtpPostAPI = (body) => axios.post('/verify-user-otp', body, config);
export const resendOtpAPI = (email) => axios.post('/resend-otp', { email }, config);

export const getFilteredNovelsAPI = (body, pageNumber) => axios.post(`/filter-novels?page=${pageNumber}`, body, config);
export const RatingPostAPI = (body) => axios.post('/rate-novel', body, config);
export const addNovelToLibraryAPI = (novelId) => axios.post('/add-to-library', { novelId, userId }, config);
export const newMessagePostAPI = (body) => axios.post('/send-message', body, config);
export const changePasswordRequestAPI = (body) => axios.post('/change-password-request', body, config);
export const changePasswordAPI = (body) => axios.post('/change-password', body, config);
export const editProfileAPI = (body) => axios.post('/edit-profile', body, config);
export const PayToReadPostAPI = (body) => axios.post('/pay-to-read-post', body, config);
export const joinCommunityAPI = (body) => axios.post('/join-community', body, config);


//AUTHOR
export const getAuthorNovelsAPI = (pageNumber) => axios.get(`/author/get-all-novels/${userId}?page=${pageNumber}`, config);
export const authorGetGenresAPI = () => axios.get('/author/get-genres', config);
export const getChapterEditDetailsAPI = (novelId, chapId) => axios.get(`/author/get-chapter-details/${novelId}/${chapId}`, config);
export const getNovelDetailByIdAPI = (novelId) => axios.get(`/author/get-novel?novelId=${novelId}`, config);


export const cancelNovelAPI = (novelId) => axios.post('/author/cancel-novel', { novelId }, config);
export const deleteChapterAPI = (body) => axios.post('/author/delete-chapter', body, config);
export const authorNovelCreateAPI = (title, formData) => axios.post(`/author/create/${title}`, formData, configForm);
export const authorAddChapterAPI = (body) => axios.post('/author/add-chapter', body, config);
export const paymentEligibleCheckAPI = (body) => axios.post('/author/payment-eligible-check', body, config);
export const PostEditChapterAPI = (body) => axios.post('/author/edit-chapter', body, config);
export const authorNovelEditAPI = (id, title, formData) => axios.post(`/author/edit-novel/${id}/${title}`, formData, configForm);
