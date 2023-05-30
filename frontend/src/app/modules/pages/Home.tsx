import { Typography } from "@material-tailwind/react";

const Home = () => {
  return (
    <div>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div
          className="absolute top-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/img/background-1.jpg')" }}
        />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              {/* img not in center */}
              <img
                src="/img/logo.png"
                alt="Logo"
                style={{ width: "160px", height: "auto" }}
                className="mx-auto mb-4"
              />
              <Typography variant="h1" className="font-black">
                <span className="text-orange-900">PERSIJA</span>{" "}
                <span className="text-white">FIGHT FOR GLORY</span>
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Manajemen Data Keanggotaan Jakmania Bintara Sub Korwil The
                Jakmania Kranji
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section id="about-us" className="bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="mt-10 flex flex-wrap items-center">
            <div className="mx-auto w-full px-4 md:w-5/12">
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Tentang Kami
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et
                leo tellus. Sed eu ornare mi. Etiam sed cursus augue.
                Suspendisse sagittis urna nibh, nec.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                consectetur nibh sit amet turpis iaculis venenatis. Pellentesque
                in rutrum sapien, vitae condimentum dui. Vestibulum accumsan
                nulla non pellentesque sagittis. Donec sagittis odio ac enim
                fringilla mattis. Sed placerat tortor non nibh suscipit
                lobortis. Sed gravida congue consectetur. Sed blandit elit.
              </Typography>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <p>IMAGE</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="mt-10 flex flex-wrap items-center">
            <div className="mx-auto w-full px-4 md:w-5/12 md:order-2">
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Tentang Kami
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et
                leo tellus. Sed eu ornare mi. Etiam sed cursus augue.
                Suspendisse sagittis urna nibh, nec.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                consectetur nibh sit amet turpis iaculis venenatis. Pellentesque
                in rutrum sapien, vitae condimentum dui. Vestibulum accumsan
                nulla non pellentesque sagittis. Donec sagittis odio ac enim
                fringilla mattis. Sed placerat tortor non nibh suscipit
                lobortis. Sed gravida congue consectetur. Sed blandit elit.
              </Typography>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0 md:order-1">
              <p>IMAGE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
