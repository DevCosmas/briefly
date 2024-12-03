import { motion } from 'framer-motion';

const modalVariants = {
  hidden: {
    opacity: 0,
    y: '-50vh',
  },
  visible: {
    opacity: 1,
    y: '0',
  },
  exit: {
    opacity: 0,
    y: '-50vh',
  },
};

export default function DeleteModal({ isDeleteOpen, onClose, onDelete, url }) {
  return (
    <>
      {isDeleteOpen && (
        <motion.div
          className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-4/5 sm:w-1/3"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete the following URL?
            </p>
            <p className="mb-2 font-semibold text-blue-600">{url}</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200">
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
