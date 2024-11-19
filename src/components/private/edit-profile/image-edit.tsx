import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import defaultUserImage from '../../../assets/images/default-user-image.png';
import EditImageModal from '../modals/Edit-image-modal';
import { ImageEditComponentType } from '../../../types';

function ImageEdit({ image, changeImage }: ImageEditComponentType) {
  const [editImageModal, setEditImageModal] = useState<boolean>(false);
  function handleEditImage() {
    setEditImageModal(true);
  }

  return (
    <div className="relative">
      <img
        src={image || defaultUserImage}
        alt="lol"
        className="rounded-full  mb-5  w-36 h-36 object-cover "
      />
      <button
        type="button"
        className="  p-2 absolute top-2 right-2 rounded-full bg-gold dark:bg-darkgold dark:hover:bg-gold hover:scale-125 hover:bg-darkgold dark:text-black transition "
        onClick={handleEditImage}
      >
        <FaEdit className="text-2xl  " />
      </button>
      {editImageModal && (
        <EditImageModal
          setModal={setEditImageModal}
          image={image}
          changeImage={changeImage}
        />
      )}
    </div>
  );
}
export default ImageEdit;
