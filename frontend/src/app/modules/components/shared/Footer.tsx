import { Typography, IconButton } from "@material-tailwind/react";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  const title = "JAKMANIA BINTARA";
  const description = "SUB KORWIL THE JAKMANIA KRANJI";
  const socials = [
    {
      color: "purple",
      name: "instagram",
      path: "https://www.instagram.com/jakmaniabintara",
    },
    {
      color: "red",
      name: "youtube",
      path: "https://www.youtube.com/@jakmaniabintara2065",
    },
    {
      color: "black",
      name: "tiktok",
      path: "https://www.tiktok.com/@jakmaniabintara",
    },
  ];
  const menus = [
    {
      name: "MENU",
      items: [
        { name: "Tentang Kami", path: "/#about-us" },
        { name: "Daftar", path: "/register" },
        { name: "Masuk", path: "/login" },
      ],
    },
    {
      name: "KONTAK KAMI",
      items: [
        {
          name: "Jl. Bintara 4, Bintara, Bekasi Barat, 17134",
          path: "https://goo.gl/maps/CdXmx5XWV7RDbgsh9",
        },
        { name: "+62 899 0181412", path: "tel:628990181412", icon: "phone" },
        {
          name: "mail.jakmaniabintara@gmail.com",
          path: "mailto:mail.jakmaniabintara@gmail.com",
          icon: "envelope",
        },
      ],
    },
  ];

  const year = new Date().getFullYear();
  const copyright = `Copyright © ${year}`;

  return (
    <footer className="relative px-4 pt-6 pb-6">
      <div className="container mx-auto lg:px-24">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as={Link}
                        smooth
                        to={item.path}
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.icon && (
                          <>
                            <i className={`fa-solid fa-${item.icon}`} />{" "}
                          </>
                        )}
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
