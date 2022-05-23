import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Inter:wght@600&display=swap"
            rel="stylesheet"
          />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:url" content="https://oskaissers.com" />
          <meta
            property="og:title"
            content="Vaagas - A sua oportunidade está aqui"
          />
          <meta property="og:site_name" content="Vaagas" />
          <meta
            property="og:description"
            content="A sua oportunidade está aqui"
          />
          {/* <meta property="og:image" content="" /> */}
          <meta property="og:image:width" content="1000" />
          <meta property="og:image:height" content="630" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
