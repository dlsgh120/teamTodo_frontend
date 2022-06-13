import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { RenderPageResult } from 'next/dist/shared/lib/utils';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<RenderPageResult> {
    // 스타일 구성 요소의 ServerStyleSheet 클래스를 인스턴스화 한다
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // renderPage : 이 메서드에 연결하여 초기 페이지 로드 시 서버 측 자식 구성 요소의 스타일 분석
      // renderPage를 커스텀 하는 이유는 서버 측 렌더링에서 제대로 작동하기 위해 애플리케이션을 래핑해야 하는 css-in-js 라이브러리와 함께 사용하기 위한 것
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      } as RenderPageResult;
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
