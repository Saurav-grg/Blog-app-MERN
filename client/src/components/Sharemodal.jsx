import React from 'react';
import Modal from 'react-modal';
import { FaShareSquare } from 'react-icons/fa';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

export default function Sharemodal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="">
      <button onClick={openModal}>
        <FaShareSquare className=" xsm:size-6 text-blue-700 relative" />
      </button>

      <Modal
        className="max-h-[400px] bg-secondary p-4 rounded
        absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
        style={{
          overlay: {
            backgroundColor: 'transparent',
          },
        }}
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-blue-800 font-semibold">
            <span> Share </span>
            <button onClick={closeModal}>close</button>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <EmailShareButton url={window.location.href}>
              <EmailIcon size={44} round />
            </EmailShareButton>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={44} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={44} round />
            </TwitterShareButton>
            <RedditShareButton url={window.location.href}>
              <RedditIcon size={44} round />
            </RedditShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={44} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={44} round />
            </LinkedinShareButton>
            <LineShareButton url={window.location.href}>
              <LineIcon size={44} round />
            </LineShareButton>
          </div>
          <div className="flex gap-2">
            <input
              className=" border-gray-400 w-[85%] rounded-md text-gray-500"
              type="text"
              value={window.location.href}
              readOnly
            />
            <button className="border text-blue-800 font-semibold bg-light hover:bg-secondary hover:rounded-none px-2 py-2 rounded-md border-blue-800">
              Copy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
