"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-900/50 scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <FolderGit2 className="w-8 h-8" /> Projects
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resumeData.projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <span className="text-xs font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                        {project.date}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-4">
                                    {project.description.map((desc, i) => (
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
