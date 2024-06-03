
const roles = {

    '/admin-novels': ['admin'],
    '/get-all-users': ['admin'],
    '/get-all-authors': ['admin'],
    '/get-all-genres': ['admin'],
    '/admin-dashboard': ['admin'],
    '/add-genre': ['admin'],
    '/approve': ['admin'],
    '/reject': ['admin'],
    '/hide-novel': ['admin'],
    '/block-user': ['admin'],
    '/list-genre': ['admin'],
    '/edit-genre': ['admin'],


    '/get-author-novels': ['author'],
    '/get-genres': ['author', 'reader'],
    '/get-chapter-details': ['author'],
    '/create': ['author'],
    '/add-chapter': ['author'],
    '/payment-eligible-check': ['author'],
    '/cancel-novel': ['author'],
    '/delete-chapter': ['author'],
    '/edit-chapter': ['author'],
    '/author-get-novel': ['author'],
    '/edit-novel': ['author'],


    '/get-novel': ['author', 'reader'],
    '/get-all-novels': ['author', 'reader'],
    '/get-library': ['author', 'reader'],
    '/get-most-viewed': ['author', 'reader'],
    '/get-new-updated': ['author', 'reader'],
    '/get-trending': ['author', 'reader'],
    '/get-random': ['author', 'reader'],
    '/get-wallet': ['author', 'reader'],
    '/check-gcoin-system': ['author', 'reader'],
    '/all-message': ['author', 'reader'],
    '/check-pay-to-read': ['author', 'reader'],
    '/get-community': ['author', 'reader'],
    '/create-payment-intent': ['author', 'reader'],
    '/add-to-library': ['author', 'reader'],
    '/filter-novels': ['author', 'reader'],
    '/payment-confirm': ['author', 'reader'],
    '/rate-novel': ['author', 'reader'],
    '/send-message': ['author', 'reader'],
    '/edit-profile': ['author', 'reader'],
    '/pay-to-read-post': ['author', 'reader'],
    '/join-community': ['author', 'reader'],
    '/get-chapter': ['author', 'reader'],
    '/text-to-speech': ['author', 'reader'],

};

module.exports = roles