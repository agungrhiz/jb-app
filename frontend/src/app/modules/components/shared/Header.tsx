import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const appName = "JB APP";

  const action = (
    <Link to="/login" onClick={() => setOpenNav(false)}>
      <Button color="orange" variant="gradient" size="sm" fullWidth>
        login
      </Button>
    </Link>
  );

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {appName}
          </Typography>
        </Link>
        <div className="hidden gap-2 lg:flex">
          <Link to="/register">
            <Button variant="text" size="sm" color="white" fullWidth>
              daftar
            </Button>
          </Link>
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse
        open={openNav}
      >
        <div className="container mx-auto rounded-xl bg-white px-4 pt-2 pb-4">
          <Link to="/register" className="mb-2 block" onClick={() => setOpenNav(false)}>
            <Button color="orange" variant="text" size="sm" fullWidth>
              daftar
            </Button>
          </Link>
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
};

export default Header;
