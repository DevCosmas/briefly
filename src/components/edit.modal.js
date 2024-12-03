import { motion } from 'framer-motion';
import { useState } from 'react';
import Notification from './notification';

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

export default function EditModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target?.name]: e.target?.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <>
      {isOpen && (
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
            <h2 className="text-xl font-bold mb-4">Add Custom Name</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                />
              </div> */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
              {/* <Notification /> */}
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
