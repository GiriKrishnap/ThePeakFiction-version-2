import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import NewUpdatedComponents from '../../components/PostComponents/gridePost.jsx';
import { getNewUpdatedPost } from '../../util/constants.jsx';

export default function Updated() {
    return (
        <div>
            <HeaderComponents  name={'Updated'} />
            <NewUpdatedComponents axiosUrl={getNewUpdatedPost} title={"UPDATED"} />
            <FooterComponents />

        </div>
    )
}

