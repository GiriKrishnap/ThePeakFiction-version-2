
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import CommunityComponent from '../../components/UserComponents/community-chat/community.jsx'


function ChatPage() {
    return (
        <div>
            <HeaderComponents name={'Community'} />
            <CommunityComponent />
            <FooterComponents />
        </div>
    )
}

export default ChatPage;