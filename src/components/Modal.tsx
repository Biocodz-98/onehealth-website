import React from "react";
import {RxCross2} from "react-icons/rx";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-lg  p-8 relative w-5/6 md:w-3/5 ">
                {/* Close Button */}
                <div className='grid grid-cols-12'>
                    <div className='col-span-1'>
                        <RxCross2
                            id='rxCross'
                            onClick={onClose}
                            className="text-md md:text-3xl text-gray-500 right-0 hover:cursor-pointer bg-gray-200 p-1 rounded-full font-extrabold"
                        />
                    </div>

                </div>

                {/* Modal Content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
