"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-6 flex justify-center text-center">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                            Hello, I&apos;m
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            {resumeData.name}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-light">
                            {resumeData.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
                            {resumeData.about}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            href="#projects"
                            className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
                        >
                            View My Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Contact Me
                        </Link>
                        {/* Optional Resume Download if user adds a file later
            <a
               href="/resume.pdf"
               className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
               <Download size={18} /> Resume
            </a>
            */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
