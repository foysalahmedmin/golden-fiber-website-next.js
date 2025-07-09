const TopHeader = () => {
  return (
    <div className="hidden h-10 bg-dark text-light lg:block">
      <div className="container flex h-full items-center justify-between">
        <div>
          <p className="hidden lg:block">Welcome to Golden Fiber Asia</p>
        </div>
        {/* <div className="flex items-center divide-x">
          <Link
            href="/seller/sign-up"
            className="group flex items-center gap-1 pr-2 text-sm hover:text-primary md:text-base"
          >
            Become a Seller
          </Link>
          <Link
            href="/seller/sign-in"
            className="group flex items-center gap-1 px-2 text-sm hover:text-primary md:text-base"
          >
            Sign-in To Seller
          </Link>
          <div className="inline-flex px-2 lg:hidden">
            <ThemeToggler />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TopHeader;
