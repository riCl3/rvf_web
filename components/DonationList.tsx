'use client'

import { IDonation } from "@/models/Donation"
import { useState } from "react"

interface DonationListProps {
    donations: IDonation[]
}

export default function DonationList({ donations }: DonationListProps) {

    // Function to convert data to CSV and trigger download
    const exportCSV = () => {
        if (!donations || donations.length === 0) return

        const headers = ["ID", "Amount", "Phone Number", "Message", "Status", "Date"]

        const rows = donations.map(d => [
            d._id,
            d.amount,
            d.phoneNumber,
            // Escape quotes in message if present
            `"${(d.message || '').replace(/"/g, '""')}"`,
            d.status,
            d.createdAt ? new Date(d.createdAt).toISOString() : ''
        ])

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `donations_export_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link) // Required for FF
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Donations & Supporters</h3>
                <div className="flex gap-4 items-center">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full text-gray-600">{donations.length} records</span>
                    <button
                        onClick={exportCSV}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-medium">Amount</th>
                            <th className="px-6 py-3 font-medium">Phone Number</th>
                            <th className="px-6 py-3 font-medium">Message</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {donations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">No donations found yet.</td>
                            </tr>
                        ) : (
                            donations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ${donation.amount}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-mono">
                                        {donation.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={donation.message}>
                                        {donation.message || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${donation.status === 'verified' ? 'bg-green-100 text-green-700' :
                                                donation.status === 'failed' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
