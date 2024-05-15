
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import AuthorNovelsComponent from '../../components/AuthorComponents/AuthorNovels.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorNovelsComponent />
            <FooterComponents />
        </div>
    )
}

export default HomePage;