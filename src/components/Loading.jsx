import React from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Loading({ message = "Loading..." }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 size={48} className="text-blue-500" />
        </motion.div>
        <p className="text-secondary font-medium animate-pulse">{message}</p>
      </motion.div>
    </AnimatePresence>
  );
}

export default Loading;
