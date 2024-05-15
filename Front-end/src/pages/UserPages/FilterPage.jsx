
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import FilterComponents from '../../components/UserComponents/novel/filter.jsx'


function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <FilterComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;