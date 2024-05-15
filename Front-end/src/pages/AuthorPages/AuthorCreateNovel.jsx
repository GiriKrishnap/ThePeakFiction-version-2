
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import AuthorCreateComponents from '../../components/AuthorComponents/AuthorCreate.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorCreateComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;