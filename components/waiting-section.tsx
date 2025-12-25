export default function WaitlistSection() {

    return (
        <div className="py-10 text-center mb-10  bg-secondary/5">
            <p className="text-muted-foreground mb-4">
                Join the Waitlist
            </p>

            {/* Subheadline */}
            <p className="text-xl md:text-3xl mb-10 ">
                We'll set up your online store for free if you join early.
            </p>
            <a href="#hero-section"
                className="mt-10 px-8 py-3 bg-primary text-white rounded-lg text-lg font-medium hover:bg-primary/90 transition"
            >
                Join the Waitlist
            </a>
        </div>
    );
}
