
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import BannerComponents from '../../components/UserComponents/home/banner.jsx';
import RowPostComponent from '../../components/PostComponents/rowPost.jsx';
import NewUpdatedComponents from '../../components/PostComponents/gridePost.jsx';
import { getMostViewedPost, getNewUpdatedPost, getTrendingPost } from '../../util/constants.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents name={'Home'} />
            <BannerComponents />
            <RowPostComponent axiosUrl={getMostViewedPost} title={"MOST VIEWED"} limit={6} />
            <NewUpdatedComponents axiosUrl={getTrendingPost} limit={4} title={"TRENDING"} home={true} />
            <RowPostComponent axiosUrl={getNewUpdatedPost} title={"NEW UPDATED"} limit={12} />
            <FooterComponents />
        </div>
    )
}

export default HomePage;