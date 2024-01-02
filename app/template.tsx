"use client"
import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="p-6 flex flex-col justify-center items-center"
      animate={{
        opacity: [0, 1],
        translateY: [-20, 0]
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100, duration: 1 }}
    >
      {children}
    </motion.main>
  )
}
