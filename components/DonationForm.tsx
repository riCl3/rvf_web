'use client'

import { useState } from 'react'
import { submitDonation } from '@/app/actions'
import SubmitButton from './SubmitButton'

export default function DonationForm() {
    const [amount, setAmount] = useState<number | ''>('')
    const [customAmount, setCustomAmount] = useState<string>('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const PRESETS = [25, 50, 100, 500]

    async function handleSubmit(formData: FormData) {
        setError(null)
        setSuccess(false)

        // Ensure amount is set
        if (!amount && !customAmount) {
            setError('Please select or enter an amount.')
            return
        }

        try {
            // Append amount if not already in formData (it won't be if controlled state is used for buttons but not a hidden input, or just rely on FormData with a hidden input)
            // Easier way: let's put the selected amount in a hidden input
            // But we can just append it here before passing to server action if we weren't using the form action directly.
            // However, using `action={submitDonation}` is the Next.js way. 
            // We can add a hidden input for amount.

            await submitDonation(formData)
            setSuccess(true)
            // Reset form
            setAmount('')
            setCustomAmount('')
            // Ideally reset other fields too, but native form reset is tricky with controlled inputs unless we do it manually.
            // For now, success message is good enough.
            const form = document.querySelector('form') as HTMLFormElement
            if (form) form.reset()

        } catch (err) {
            console.error(err)
            setError('Something went wrong. Please try again.')
        }
    }

    const handlePresetClick = (val: number) => {
        setAmount(val)
        setCustomAmount('')
    }

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value)
        setAmount('')
    }

    const finalAmount = customAmount ? customAmount : amount

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h3>

            {success ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center animate-fade-in-up">
                    <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xl font-bold mb-2">Thank You!</h4>
                    <p>Your donation request has been received. We will contact you shortly to complete the process.</p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="mt-6 text-green-700 font-bold hover:underline"
                    >
                        Make another donation
                    </button>
                </div>
            ) : (
                <form action={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => handlePresetClick(preset)}
                                    className={`py-3 px-4 rounded-xl font-bold transition-all border ${amount === preset
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                        }`}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                            <input
                                type="number"
                                name="custom_amount_display" // Not sent directly if we use hidden input
                                placeholder="Custom Amount"
                                value={customAmount}
                                onChange={handleCustomChange}
                                className={`w-full pl-8 pr-4 py-3 rounded-xl border font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all ${customAmount ? 'border-blue-500 bg-white ring-1 ring-blue-500' : 'border-gray-200 bg-gray-50'
                                    }`}
                            />
                        </div>
                        {/* Hidden input to send the actual selected amount */}
                        <input type="hidden" name="amount" value={finalAmount} />
                    </div>

                    {/* Contact Info */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            placeholder="Leave a note..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <SubmitButton className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-[1.02]">
                        Complete Donation
                    </SubmitButton>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure transaction. Your support makes a difference.
                    </p>
                </form>
            )}
        </div>
    )
}
