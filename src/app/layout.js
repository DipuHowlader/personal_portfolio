import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./responsive.scss";
import ClientLayout from "./clientLayout";


export default function RootLayout({children}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="color-scheme" content="dark light" />
          <meta
            name="description"
            content="I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems."
          />
          <link
            rel="shortcut icon"
            href="/images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://aesthetic-druid-a5c893.netlify.app/"
          />
          <meta
            property="og:title"
            content="Transforming Data into Insights: Dipu"
          />
          <meta
            property="og:description"
            content="I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems."
          />
          <meta
            property="og:image"
            content="https://aesthetic-druid-a5c893.netlify.app/path-to-your-image.jpg"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://aesthetic-druid-a5c893.netlify.app/"
          />
          <meta
            property="twitter:title"
            content="Transforming Data into Insights: Dipu"
          />
          <meta
            property="twitter:description"
            content="I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems."
          />
          <meta
            property="twitter:image"
            content="https://aesthetic-druid-a5c893.netlify.app/path-to-your-image.jpg"
          />

          {/* <!-- Additional SEO tags --> */}
          <meta name="author" content="Dipu" />
          <meta
            name="keywords"
            content="dipu protfolio, machine-learning,  ML Engineer, Data Scientist"
          />
          <link
            rel="canonical"
            href="https://aesthetic-druid-a5c893.netlify.app/"
          />
        </head>
        <body>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </>
  );
}
