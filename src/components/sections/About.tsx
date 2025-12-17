"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function About() {
    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-zinc-900/50 scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8">About Me</h2>
                    <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                        <p>{resumeData.about}</p>
                        {/* Education could go here or in About or Experience. I'll put Education here briefly as text or separate block */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4">Education</h3>
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-medium text-lg">{edu.school}</p>
                                    <p className="text-gray-500">{edu.degree}</p>
                                    <p className="text-sm text-gray-400">{edu.year} | {edu.grade}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
