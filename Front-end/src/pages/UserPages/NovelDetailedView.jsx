
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import NovelDetailedViewComponents from '../../components/UserComponents/novel/novelDetailedView.jsx';
//............................................................................................

function NovelDetailPage() {
    return (
        <div>
            <HeaderComponents />
            <NovelDetailedViewComponents />
            <FooterComponents />
        </div>
    )
}

export default NovelDetailPage;