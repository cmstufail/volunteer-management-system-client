import { useEffect } from 'react';

const useTitle = ( title ) => {
    useEffect( () => {
        document.title = `${ title } || VolunteerHub`;
    }, [ title ] );
};

export default useTitle;