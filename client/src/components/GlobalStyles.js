import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
       // USED IN MAIN NAVBAR, SECONDARY BUTTONS, HOVER MAIN BUTTONS 
    --darkblue: #142b6f;
    // USED AS A BACKGROUND COLOR 
    --background: #fffcf2;
    // USED IN THE SECONDARY NAVBAR DISPLAYING CATEGORY
    --yellow: rgb(255, 214, 0);
    // USED IN ICONS // LOGO MAIN NAVBAR
    --hoveryellow:  #f4d35e;

    --purple: #4d194d;
    /* --turquoise: #0593A2;
    // USED TO HIGHLIGHT SMALL SPAN
    --redbutton:  #E3371E;
    // HIGHTLIGNT COLOR USED IN MAIN BUTTONS
    --corail: #ff7a48;
    // FONTS FOR LOGO
    --logo: 'Besley', serif;
    // FONT FOR EVERYTHING ELSE
    --body: 'Arimo', sans-serif; */
    }
    body, html {
    height: 100%;
    margin: 0;
}
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-family: roboto, sans-serif;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3, p {
      color: var(--darkblue);
  
    }
    h2 {
      font-size: 28px;
    }
    div, button, textarea {
        font-family: roboto;
        color: var(--darkblue);
    }
`;
