"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"

export function WaitlistForm() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setLoading(true)
        // Simulate API call
        const response = await axios.post("/api/waitlist", { email }).then((res) => {
            setMessage(res.data.message);
        });
        console.log(response)
        setLoading(false)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-4 text-green-500 bg-green-500/10 rounded-lg border border-green-500/20"
            >
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{message}
                </span>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center space-x-2">
            <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/60 w-full backdrop-blur-sm h-11 text-sm md:text-base focus-visible:ring-primary"
                required
            />
            <Button type="submit" disabled={loading} className="h-11 px-6 font-medium dark:bg-primary">
                {loading ? (
                    "Joining..."
                ) : (
                    <>
                        Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
        </form>
    )
}
