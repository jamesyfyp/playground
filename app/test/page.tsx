'use client'
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { motion, useScroll, useMotionValueEvent, useSpring} from "framer-motion"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll() 
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  )
  const [margin, setMargin] = useState<number>(20)
  const [fontSize, setFontSize] = useState<number>(20)

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("ScrollProgress: ", latest)
  })

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [fontSize]);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Calculate the textarea's scroll height
    const scrollHeight = event.target.scrollHeight;
    // Update the textarea's height based on the scroll height
    event.target.style.height = `${scrollHeight}px`;
  };
  
  return (
    <main className="relative"> 
       
    <div className="h-9 w-screen flex sticky top-0">
        <Button  variant={textAlign == "left" ? "outline" : "default"} onClick={()=>setTextAlign("left")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
        </Button>
        <Button variant={textAlign == "center" ? "outline" : "default"} onClick={()=>setTextAlign("center")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>

        </Button>
        <Button variant={textAlign == "right" ? "outline" : "default"} onClick={()=>setTextAlign("right")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
        </Button>
        <p className="mt-1">Font Size:</p>
        <Select onValueChange={(value)=>{setFontSize(parseInt(value))}}>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
                {(() => {
                    const options = [];
                    for (let i = 5; i <= 200; i += 5) {
                    options.push(
                        <SelectItem key={i} value={i.toString()}>
                        {i}
                        </SelectItem>
                    );
                    }
                    return options;
                })()}
            </SelectContent>
        </Select>
        <p className="mt-1">Margin:</p>
        <Select onValueChange={(value)=>{setMargin(parseInt(value))}}>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
                {(() => {
                    const options = [];
                    for (let i = 10; i <= 200; i += 5) {
                    options.push(
                        <SelectItem key={i} value={i.toString()}>
                        {i}
                        </SelectItem>
                    );
                    }
                    return options;
                })()}
            </SelectContent>
        </Select>

        

    </div>
    <div style={{ marginLeft: margin, marginRight: margin }}>
        <textarea
          ref={textAreaRef}
          autoFocus
          className="w-full pt-10 resize-none border-none outline-none overflow-y-auto"
          style={{
            textAlign: textAlign,
            fontSize: fontSize,
            minHeight: "100px", // Set a minimum height to prevent collapse
          }}
          onChange={handleTextAreaChange} // Dynamically adjust height
        ></textarea>
    </div>
    
    </main>
  );
}
