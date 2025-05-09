import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#212121]">
      <motion.div
        className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
