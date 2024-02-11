'use client'
import { motion, useScroll, useMotionValueEvent, useSpring} from "framer-motion"
import Image from "next/image";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll() 

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })
  console.log(scrollYProgress)
  return (
    <main> 
      <motion.div 
        className="fixed top-0 left-0 right-0 h-10 bg-red-500 origin-top-left"
        style={{ scaleX: useSpring(scrollYProgress, {stiffness: 100, damping:5}) }}  
      /> 
      <div className="h-screen bg-teal-300">
      </div>
      <div className="h-screen bg-purple-500">

      </div>
      <div className="h-screen bg-yellow-300">

      </div>
      <div className="h-screen bg-lime-500">

      </div>
    </main>
  );
}