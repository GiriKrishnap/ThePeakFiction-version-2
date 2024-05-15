
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import AuthorHomeComponents from '../../components/AuthorComponents/AuthorHome.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorHomeComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;