
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import GridePostComponent from '../../components/PostComponents/gridePost.jsx';
import { getLibraryNovelsUrl } from '../../util/constants.jsx';

export default function Library() {
    return (
        <div>
            <HeaderComponents name={'My Library'} />
            <GridePostComponent axiosUrl={getLibraryNovelsUrl} title={"My Library"} />
            <FooterComponents />
        </div>
    )
}

