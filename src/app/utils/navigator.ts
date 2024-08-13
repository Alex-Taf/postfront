export const getRouteNameFromPath = (location, { exclude }) => {
    switch (exclude) {
        case 'full':
            return location.href.split('/').slice(3).join('/');
            break;
        case 'lastChild':
            return location.href.split('/').pop();
            break;
        default:
            break;
    }
}
