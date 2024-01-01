"use client"
import { motion } from "framer-motion"

export default function Welcome() {
  return (
    <>
      <motion.h1
        className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
        animate={{
          opacity: [0, 1],
          translateY: [-20, 0]
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100, duration: 2, delay: 0.5 }}
      >
        Welcome to NEXTsocial!
      </motion.h1>
      <p>Please log in to access features such as friends and posts.</p>
    </>
  )
}
