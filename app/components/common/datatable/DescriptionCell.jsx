import { useState } from 'react'

const DescriptionCell = ({ value }) => {
    const [isExpanded, setIsExpanded] = useState(false); 
    const maxLength = 28; 

    const shouldShowButton = value.length > maxLength; 

    return (
        <div>
            <div
                style={{
                    maxWidth: '200px', 
                    whiteSpace: isExpanded ? 'normal' : 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: !isExpanded ? 'ellipsis' : 'clip', 
                    wordWrap: 'break-word', 
                }}
            >
                {value}
            </div>
            {shouldShowButton && (
                <button
                    className={`mt-2 text-sm font-semibold rounded-md transition duration-300 ${isExpanded ? 'bg-gray-300 hover:bg-gray-400 text-gray-700' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } py-1 px-3`}
                    onClick={() => setIsExpanded(!isExpanded)} 
                >
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
            )}
        </div>
    );
}

export default DescriptionCell