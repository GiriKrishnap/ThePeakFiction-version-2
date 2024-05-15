
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import ReadNovelComponents from '../../components/UserComponents/novel/ReadNovel.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <ReadNovelComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;