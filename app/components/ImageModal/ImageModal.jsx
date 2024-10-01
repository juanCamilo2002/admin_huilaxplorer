const ImageModal = ({ isOpen, image, onClose }) => {
    if (!isOpen || !image) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative">
                <img src={image.url} alt={image.alt} className="max-h-screen max-w-full object-cover" />
                <button
                    className="absolute top-2 right-2 p-2 bg-white rounded-full"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ImageModal;