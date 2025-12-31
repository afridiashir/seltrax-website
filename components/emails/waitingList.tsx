export function EmailTemplate({ name = "there", line = 0 }) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600 }}>
            <p>Hi {name},</p>

            <p>
                I'm Asher, founder of Seltrax.
            </p>

            <p>
                You recently joined our waitlist — thank you for signing up.
            </p>

            <p>
                <strong>Good news:</strong> you're currently <strong>#{line} in line</strong> for early access.
            </p>

            <p>
                Seltrax is being built to help e-commerce store owners save time and reduce operational costs — without complexity.
            </p>

            <p>
                Early access members will receive:
            </p>

            <ul>
                <li>Complimentary store setup</li>
                <li>Priority support during launch</li>
                <li>Early access to Seltrax features</li>
            </ul>

            <p>
                <strong>Quick question:</strong> what problem are you hoping Seltrax will solve for you?
            </p>

            <p>
                Just hit reply — I personally read every response.
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
