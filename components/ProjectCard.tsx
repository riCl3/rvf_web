'use client'

import { useState } from 'react'
import { IContent } from '@/models/Content'

export default function ProjectCard({ project }: { project: IContent }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const metadata = project.metadata || {}
    const duration = metadata.duration || ''
    const projectReport = metadata.projectReport || project.description || ''
    const objectives = metadata.objectives || ''
    const timeline = metadata.timeline || ''
    const details = metadata.details || ''

    return (
        <>
            {/* Card - Clickable */}
            <article
                onClick={() => setIsExpanded(true)}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${project.image || '/placeholder.png'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                            {project.category || 'Project'}
                        </span>
                    </div>
                    {project.isFeatured && (
                        <div className="absolute top-4 right-4">
                            <span className="inline-block px-3 py-1 bg-amber-500/90 backdrop-blur text-white text-xs font-bold uppercase rounded-md shadow-sm">
                                ★ Featured
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-grow">
                            {project.title}
                        </h3>
                        {duration && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md whitespace-nowrap">
                                {duration}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {projectReport}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-400">
                        <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recently'}</span>
                        <span className="text-blue-600 font-medium group-hover:underline">View Details →</span>
                    </div>
                </div>
            </article>

            {/* Modal */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Content */}
                        <div className="grid md:grid-cols-3 gap-6 p-8">
                            {/* Left: Content */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="float-right text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Close"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                                            {project.category || 'Project'}
                                        </span>
                                        {duration && (
                                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-md flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {duration}
                                            </span>
                                        )}
                                        {project.isFeatured && (
                                            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase rounded-md">
                                                ★ Featured
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                        {project.title}
                                    </h2>
                                </div>

                                {/* Project Report */}
                                {projectReport && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Project Report</h4>
                                        <p className="text-gray-700 leading-relaxed">{projectReport}</p>
                                    </div>
                                )}

                                {/* Objectives */}
                                {objectives && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Objectives</h4>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{objectives}</p>
                                    </div>
                                )}

                                {/* Timeline */}
                                {timeline && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Implementation Timeline</h4>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{timeline}</p>
                                    </div>
                                )}

                                {/* Details */}
                                {details && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Project Details</h4>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{details}</p>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="pt-4 border-t border-gray-100 text-sm text-gray-400">
                                    <span>Published: {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}</span>
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="md:col-span-1">
                                <div className="sticky top-8 rounded-xl overflow-hidden border border-gray-200 shadow-md h-80 md:h-full min-h-[300px]">
                                    {project.image ? (
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                            <div className="text-center text-gray-400">
                                                <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <p className="text-sm">No Image</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    )
}
