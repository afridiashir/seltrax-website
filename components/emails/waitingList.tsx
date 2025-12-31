export function EmailTemplate({ name = "there" }) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600 }}>
            <p>Hi {name},</p>

            <p>
                My name is Asher - I'm the founder and CEO of Seltrax.
            </p>

            <p>
                We're building this for people who wanted to save time and money on their e-commerce stores.
            </p>

            <p>
                A simple, fast and affordable platform to manage your e-commerce stores.
            </p>

            <p>Here's the things will get early access users</p>

            <ol>
                <li>We will setup your store for free</li>
                <li>12 month of free support</li>
                <li>1 month of free seltrax</li>
            </ol>

            <p>
                <b>Quick question — what made you sign up?</b>
            </p>

            <p>
                Hit 'reply' and let me know! I read and reply to every email.
            </p>

            <p>
                Cheers,
                <br />
                Asher
            </p>
        </div>
    );
}
