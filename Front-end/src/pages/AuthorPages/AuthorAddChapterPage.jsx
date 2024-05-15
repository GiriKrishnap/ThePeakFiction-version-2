
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx'
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import AuthorAddChapter from '../../components/AuthorComponents/AddChapter.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorAddChapter />
            <FooterComponents />
        </div>
    )
}

export default HomePage;