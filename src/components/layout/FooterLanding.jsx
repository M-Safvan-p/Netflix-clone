const FooterLanding = () => {
  return (
    <footer className="bg-black px-6 py-12  text-[#b3b3b3]">
      <div className="mx-auto space-y-8">
        {/* Call */}
        <p className="text-sm">
          Questions? Call{" "}
          <a href="tel:000-800-919-1743" className="underline hover:text-white">
            000-800-919-1743
          </a>
        </p>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-4">
          <ul className="space-y-2">
            <li>
              <a className="underline hover:text-white" href="#">
                FAQ
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Investor Relations
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Speed Test
              </a>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <a className="underline hover:text-white" href="#">
                Help Centre
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Jobs
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Cookie Preferences
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Legal Notices
              </a>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <a className="underline hover:text-white" href="#">
                Account
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Ways to Watch
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Corporate Information
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Only on Netflix
              </a>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <a className="underline hover:text-white" href="#">
                Media Centre
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Terms of Use
              </a>
            </li>
            <li>
              <a className="underline hover:text-white" href="#">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Language */}
        <div>
          <select
            className="rounded border border-[#333] bg-black px-4 py-2 text-sm text-white"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        {/* Country */}
        <p className="text-sm">Netflix India</p>

        {/* reCAPTCHA note */}
        <p className="max-w-xl text-xs text-[#737373]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterLanding;
