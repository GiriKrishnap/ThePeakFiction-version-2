
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import AuthorNovelDetailComponents from '../../components/AuthorComponents/NovelDetailAuthor.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorNovelDetailComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;