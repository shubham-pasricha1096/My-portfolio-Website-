"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" className="py-20 bg-black text-white scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
                        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
                            <a
                                href={`mailto:${resumeData.email}`}
                                className="flex items-center gap-3 text-xl hover:text-gray-300 transition-colors"
                            >
                                <Mail /> {resumeData.email}
                            </a>
                            <span className="hidden md:inline text-gray-600">|</span>
                            <a
                                href={`tel:${resumeData.phone}`}
                                className="flex items-center gap-3 text-xl hover:text-gray-300 transition-colors"
                            >
                                <Phone /> {resumeData.phone}
                            </a>
                        </div>

                        <div className="flex justify-center gap-6 mb-12">
                            <a
                                href={resumeData.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href={resumeData.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Github size={24} />
                            </a>
                        </div>

                        <div className="text-sm text-gray-500">
                            © {new Date().getFullYear()} {resumeData.name}. All rights reserved.
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
