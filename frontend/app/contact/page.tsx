import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-4xl mx-auto">
        <Link
            href="/"
            className="
            inline-flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            transition
            mb-10
            "
            >
            ← Back
        </Link>

        <h1 className="text-5xl font-bold">
          Contact
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl leading-relaxed">
          Interested in collaborating, discussing systems,
          backend engineering, distributed architectures,
          or experimental projects?
          Feel free to reach out.
        </p>

        <div className="mt-12 flex flex-col gap-6">

          <a
            href="mailto:zenobell143@gmail.com?subject=Portfolio Inquiry"
            className="
            p-6
            border border-gray-800
            rounded-2xl
            hover:border-blue-500
            hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
            transition-all
            "
          >
            <h2 className="text-xl font-semibold">
              Email
            </h2>

            <p className="text-gray-400 mt-2">
              zenobell143@gmail.com
            </p>
          </a>

          <a
            href="https://github.com/Zeno0"
            target="_blank"
            rel="noopener noreferrer"
            className="
            p-6
            border border-gray-800
            rounded-2xl
            hover:border-blue-500
            hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
            transition-all
            "
          >
            <h2 className="text-xl font-semibold">
              GitHub
            </h2>

            <p className="text-gray-400 mt-2">
              github.com/Zeno0
            </p>
          </a>

        </div>

      </div>

    </main>
  );
}