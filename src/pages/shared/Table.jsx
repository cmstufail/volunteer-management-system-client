import React from 'react';

const Table = ( { columns = [], data = [], renderRow } ) => {

    return (
        <div className="overflow-x-auto max-w-full mx-auto border border-gray-300 dark:border-gray-700 rounded-lg">
            <table className="table w-full">
                <thead>
                    <tr>
                        { columns.map( ( col, index ) => {
                            const isObject = typeof col === 'object' && col !== null;

                            const headerText = isObject ? col.header : col;
                            const alignClass = isObject && col.align === 'center' ? 'text-center' : 'text-left';

                            return (
                                <th
                                    key={ index }
                                    className={ `p-3 ${ alignClass }` }
                                >
                                    { headerText }
                                </th>
                            );
                        } ) }
                    </tr>
                </thead>

                <tbody>
                    { data.length > 0 ? (
                        data.map( ( item, index ) => (
                            renderRow( item, index )
                        ) )
                    ) : (
                        <tr>
                            <td colSpan={ columns.length } className="text-center p-4 text-gray-500">
                                No data to display.
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
