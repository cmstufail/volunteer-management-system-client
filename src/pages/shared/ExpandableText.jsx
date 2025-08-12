import { useState } from 'react';

// components
import { useTheme } from '../../context/ThemeProvider';

const ExpandableText = ( { text, maxLength = 150 } ) => {

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [ isExpanded, setIsExpanded ] = useState( false );

    if ( text.length <= maxLength ) {
        return <p className={ `text-base leading-relaxed ${ isDark ? 'text-white' : 'text-gray-800' }` }>{ text }</p>;
    }

    const toggleText = () => {
        setIsExpanded( !isExpanded );
    };

    return (
        <div>
            <p className={ `text-base leading-relaxed ${ isDark ? 'text-white' : 'text-gray-800' }` }>
                { isExpanded ? text : `${ text.substring( 0, maxLength ) }...` }
            </p>
            <button
                onClick={ toggleText }
                className="text-primary font-semibold hover:underline mt-2 cursor-pointer"
            >
                { isExpanded ? 'Show Less' : 'Read More' }
            </button>
        </div>
    );
};

export default ExpandableText;
