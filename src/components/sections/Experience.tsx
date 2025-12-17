"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Briefcase } from "lucide-react";

export default function Experience() {
    return (
        <section id="experience" className="py-20 scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <Briefcase className="w-8 h-8" /> Experience
                    </h2>

                    <div className="space-y-12">
                        {resumeData.experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black dark:bg-white" />

                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                    <h3 className="text-xl font-bold">{job.role}</h3>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                        {job.period}
                                    </span>
                                </div>

                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                                    {job.company}
                                </p>

                                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
                                    {job.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
