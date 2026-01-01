export function AlreadyWaitlistTemplate({ name = "there", line = 0 }) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600 }}>
            <p>Hi {name},</p>

            <p>
                You're already on the waitlist!
            </p>

            <p>
                <strong>Good news:</strong> you're currently <strong>#{line} in line</strong> for early access.
            </p>

            <p>
                Seltrax is being built to help e-commerce store owners save time and reduce operational costs — without complexity.
            </p>


            <p>
                Best regards,<br />
                Asher<br />
                Founder, Seltrax
            </p>

            <p style={{ fontSize: 12, color: "#777" }}>
                You're receiving this email because you signed up for Seltrax updates.
            </p>
        </div>
    );
}
