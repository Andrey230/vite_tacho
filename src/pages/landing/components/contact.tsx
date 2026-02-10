export default function Contact() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Skontaktuj się z nami
                </h2>

                <p className="text-base-content/70 mb-10">
                    Masz pytania dotyczące Driverfy, wdrożenia lub funkcjonalności?
                    Chętnie pomożemy.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body items-center text-center">
                            <div className="text-primary mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"/>
                                </svg>

                            </div>
                            <h3 className="font-semibold text-lg">
                                Email
                            </h3>
                            <p className="opacity-70">
                                Napisz do nas w dowolnym momencie
                            </p>
                            <a
                                href="mailto:kontakt@driverfy.pl"
                                className="link link-primary mt-2"
                            >
                                kontakt@driverfy.pl
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body items-center text-center">
                            <div className="text-primary mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                                </svg>

                            </div>
                            <h3 className="font-semibold text-lg">
                                Telefon
                            </h3>
                            <p className="opacity-70">
                                Dostępni w dni robocze 9:00 – 17:00
                            </p>
                            <a
                                href="tel:+48123456789"
                                className="link link-primary mt-2"
                            >
                                +48 123 456 789
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-sm opacity-50 mt-8">
                    Odpowiadamy zazwyczaj w ciągu 24 godzin roboczych.
                </p>
            </div>
        </section>
    );
}
